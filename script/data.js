"use strict";
//DOM element
const btnImport = document.getElementById("import-btn");
const btnExport = document.getElementById("export-btn");
//1. Export Dữ Liệu
function exportData() {
  //Tạo biến lấy dữ liệu từ LocalStorage sau khi chuyển đổi thành String
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"))], {
    type: "text/plain;charset=utf-8",
  });
  //Phương thức lưu và tên tệp
  saveAs(blob, "petData.json");
}
//Event - Chạy hàm lưu data khi ấn btn EXPORT
btnExport.addEventListener("click", function () {
  exportData();
});
//2. Import dữ liệu
//Tạo DOM element để alert khi người dùng chưa chọn tệp
const inputFile = document.getElementById("input-file");
//Lấy petArr từ LStorage
let petArrNew = getFromStorage("petArr");
//Biến chứa ID của PetArr cũ
let idData = [];
//Biến chứa Id của petArr cũ ko trùng với data mới (để giữ lại)
let diffId = [];
//Hàm import
function importData() {
  //Tệp được tải lên
  const [file] = document.querySelector("input[type=file]").files;
  //Đọc tệp
  const reader = new FileReader();
  //Sự kiện khi tệp được load
  reader.addEventListener(
    "load",
    () => {
      //Biến chứa data được tải lên sau khi parse
      const importedData = JSON.parse(reader.result);
      //Lọc list ID của pet cũ và push vào biến chứa ID
      petArrNew.forEach((e) => idData.push(e.id));
      //Loop pet list trong LocalStorage để tìm pet có ID trùng
      importedData.forEach(function (e) {
        petArrNew.forEach((p, i) => {
          if (p.id === e.id) {
            //Update dữ liệu mới khi trùng ID, vẫn giữ lại dữ liệu cũ
            petArrNew[i] = e;
          }
        });
      });
      //Lọc những pet mới không có ID trùng
      diffId = importedData.filter(function (item) {
        return idData.indexOf(item.id) === -1;
      });
      //Nối array dữ liệu pet cũ đã được update và pet mới ko trùng ID
      const newData = petArrNew.concat(diffId);
      //Lưu dữ liệu mới vào LocalStorage
      saveToStorage("petArr", newData);
      //Đặt lại value
      diffId = [];
      idData = [];
      petArrNew = getFromStorage("petArr");
      //Thông báo tải lên thành công
      alert("Data imported successfully!");
    },
    false
  );
  //Check file
  if (file) reader.readAsText(file);
}
//Bắt sự kiện khi ấn btn Import
btnImport.addEventListener("click", function () {
  if (inputFile.files.length == 0) {
    //Thông báo khi chưa chọn file
    alert("You need to choose a file!");
  }
  importData();
});
