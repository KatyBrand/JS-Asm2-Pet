"use strict";

// Hiện dữ liệu mặc định trong LocalStorage
// renderTableData(petArr);
// Bắt sự kiện khi click vào nút FIND
btnFind.addEventListener("click", function () {
  let petFound = petArr;
  // Lọc pet tương ứng với dữ liệu người dùng nhập
  // Trường ID, tìm pet có id chứa những ký tự trong trường ID user nhập
  if (idInput.value) {
    petFound = petFound.filter((p) => p.id.includes(idInput.value));
  }
  // Trường ID - Tương tự với trường ID
  if (nameInput.value) {
    petFound = petFound.filter((p) => p.name.includes(nameInput.value));
  }
  // Trường Type - mặc định value là "Select"
  if (typeInput.value !== "select") {
    petFound = petFound.filter((p) => p.type === typeInput.value);
  }
  // Trường Breed - mặc định value là "Select"
  if (breedInput.value !== "select") {
    petFound = petFound.filter((p) => p.breed === breedInput.value);
  }
  // Lọc pet khi người dùng check vào 3 trường dưới đây.
  if (vaccinatedInput.checked) {
    petFound = petFound.filter((p) => p.vaccinated === vaccinatedInput.checked);
  }
  if (dewormedInput.checked) {
    petFound = petFound.filter((p) => p.dewormed === dewormedInput.checked);
  }
  if (sterilizedInput.checked) {
    petFound = petFound.filter((p) => p.sterilized === sterilizedInput.checked);
  }
  //Render lại table với dữ liệu tìm được
  renderTableData(petFound);
});

const renderBreed = function (bo) {
  for (let i = 0; i < bo.length; i++) {
    const options = bo[i].breed;
    //Chèn các options vào HTML
    const option = document.createElement("option");
    option.innerHTML = `<option>${options}</option>`;
    breedInput.appendChild(option);
  }
};
//Khi người dùng tìm theo Breed
if (typeInput.value === "select") {
  //Lọc các Breed
  const breedOption = breedArr.filter((breed) => breed.breed);
  breedInput.innerHTML = `<option value = "select">Select Breed</option>`;
  renderBreed(breedOption);
}

//Phương thức onchange khi thay đổi Type - Hiện Breed theo Type
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

//Hàm xóa pet theo petID
function deletePet(petID) {
  if (confirm("Are you sure?")) {
    //Tìm index của object chứa petID cần xóa
    let row = petArr.find((row) => row.id == petID);
    //Xóa object đã tìm được
    petArr.splice(petArr.indexOf(row), 1);
    saveToStorage("petArr", petArr);
    alert("Pet was deleted successfully!");
    renderTableData();
  }
}
