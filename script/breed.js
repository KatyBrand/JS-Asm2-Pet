"use strict";
//Hiện dữ liệu trong LStorage khi tải trang
window.onload = function () {
  getFromStorage("breedArr");
  renderBreedTable(breedArr);
};
//Focus vào trường nhập Breed cho đẹp
breedInput.focus();
//Bắt sự kiện click Submit
submitBtn.addEventListener("click", function () {
  const data = {
    type: typeInput.value,
    breed: breedInput.value,
  };
  //Validate dữ liệu
  const validateData = function () {
    if (!breedInput.value) {
      alert("Please input Breed!");
      return false;
    }
    if (typeInput.value === "select") {
      alert("Please select Type!");
      return false;
    }
    return true;
  };
  if (validateData(data)) {
    //Thêm data mới vào breedArr
    breedArr.push(data);
    //Clear input
    clearInputBreed();
    //Render dữ liệu trên trình duyệt
    renderBreedTable(breedArr);
    //Lưu dữ liêu mới vào LocalStorage
    saveToStorage("breedArr", breedArr);
  }
});
//Hàm clear input
const clearInputBreed = () => {
  breedInput.value = "";
  typeInput.value = "select";
};
//Hàm xóa Breed
function deleteBreed(breed) {
  if (confirm("Are you sure?")) {
    //Tìm index của object chứa Breed cần xóa
    let row = breedArr.find((row) => row.breed == breed);
    //Xóa object đã tìm được
    breedArr.splice(breedArr.indexOf(row), 1);
    renderBreedTable(breedArr);
    saveToStorage("breedArr", breedArr);
  }
}
