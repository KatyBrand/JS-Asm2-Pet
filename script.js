"use strict";

// const btnBMI = document.getElementById("bmi-btn");
//Thêm để focus vào phần nhập id khi load lại trang
idInput.focus();
//Tạo array lưu data các healthy pet
let healthyPetArr = [];
//Đặt giá trị false vì chưa truy cập/ click
let healthyCheck = false;
let BMICheck = false;
//Hiện dữ liệu mặc định khi tải trang
window.onload = function () {
  getFromStorage("petArr");
  renderTableData(petArr);
};

//Tạo hàm kiểm tra thông tin nhập
//1. ID check
const validateData = function () {
  const checkID = function () {
    // ID check
    if (!idInput.value) {
      alert("Please input ID");
      return false;
    } else {
      for (let i = 0; i < petArr.length; i++) {
        if (idInput.value == petArr[i].id) {
          alert("ID must be unique!");
          return false;
        }
      }
    }
    return true;
  };
  // 1. Name check
  const checkName = function () {
    if (!nameInput.value) {
      alert("Please input Name");
      return false;
    } else return true;
  };
  //2. Age check
  const checkAge = function () {
    if (!ageInput.value) alert("Please input Age");
    // return false;
    if (ageInput.value < 1 || ageInput.value > 15) {
      alert("Age must be between 1 and 15!");
      return false;
    } else return true;
  };
  //3. Type check
  const checkType = function () {
    if (typeInput.value == "select") {
      alert("Please select Type!");
      return false;
    } else return true;
  };
  //4. Weight check
  const checkWeight = function () {
    if (!weightInput.value) alert("Please input Weight");
    // return false;
    if (weightInput.value < 1 || weightInput.value > 15) {
      alert("Weight must be between 1 and 15!");
      return false;
    } else return true;
  };
  //5. Length check
  const checkLength = function () {
    if (!lengthInput.value) alert("Please input Length");
    if (lengthInput.value < 1 || lengthInput.value > 100) {
      alert("Length must be between 1 and 100!");
      return false;
    } else return true;
  };
  //6. Breed Check
  const checkBreed = function () {
    if (breedInput.value == "select") {
      alert("Please select Breed!");
      return false;
    } else return true;
  };
  // User điền form đủ tiêu chí thì true
  if (
    checkID() &&
    checkName() &&
    checkAge() &&
    checkType() &&
    checkWeight() &&
    checkLength() &&
    checkBreed()
  )
    return true;
};
//Xử lý sự kiện khi ấn button "Submit"
submitBtn.addEventListener("click", function (e) {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    //Thêm .toLocaleDateString('en-GB') để chỉ hiện ngày tháng năm
    date: new Date().toLocaleDateString("en-GB"),
  };

  //Chạy hàm để kiểm tra việc nhập dữ liệu đúng chưa
  if (validateData(data)) {
    //Đẩy dữ liệu vào petArray
    petArr.push(data);
    //Xóa dữ liệu đã nhập trong các trường
    clearInput();
    //Chạy hàm render dữ liệu lên trình duyệt
    renderTableData(petArr);
    //Lưu dữ liệu mới vào LocalStorage
    saveToStorage("petArr", petArr);
  }
});

//Hàm xóa pet theo petID
function deletePet(petID) {
  if (confirm("Are you sure?")) {
    //Tìm index của object chứa petID cần xóa
    let row = petArr.find((row) => row.id == petID);
    //Xóa object đã tìm được
    petArr.splice(petArr.indexOf(row), 1);
    renderTableData(petArr);
    saveToStorage("petArr", petArr);
  }
}

// CHO TRANG CHỦ
// Render Breed theo Type
const renderBreed = function (bo) {
  for (let i = 0; i < bo.length; i++) {
    const options = bo[i].breed;
    //Chèn các options vào HTML
    const option = document.createElement("option");
    option.innerHTML = `<option>${options}</option>`;
    breedInput.appendChild(option);
  }
};
//Phương thức onchange khi thay đổi Type
if (typeInput) {
  typeInput.onchange = function () {
    const breedOption = breedArr.filter(function (breed) {
      //Nếu value match render lại trường Breed theo Type
      if (breed.type === typeInput.value) return breed.breed;
    });
    breedInput.innerHTML = `<option value = "select">Select Breed</option>`;
    renderBreed(breedOption);
  };
}

//Xử lý sự kiện khi ấn button "Show healthy pet"
btnHealthy.addEventListener("click", function () {
  if (healthyCheck == false) {
    //Lọc object đủ tiêu chí heo thì và gán vô healthyPetArr
    healthyPetArr = petArr.filter(
      (el) =>
        el.vaccinated == true && el.dewormed == true && el.sterilized == true
    );
    renderTableData(healthyPetArr);
    //Đổi nội dung hiển thị trên HTML sau khi click
    btnHealthy.textContent = "Show all Pet";
    healthyCheck = true;
  } else {
    renderTableData(petArr);
    btnHealthy.textContent = "Show Healthy Pet";
    healthyCheck = false;
  }
});
