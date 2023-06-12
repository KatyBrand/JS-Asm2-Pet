"use strict";

//Render Table
const renderTableEdit = function (petArr) {
  tableBody.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    //Tạo toán thử 3 ngôi để hiện icon theo dữ liệu đã nhập - Tạo biến mới để HTML Code dễ nhìn hơn
    const vaccin = petArr[i].vaccinated
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    const dewormed = petArr[i].dewormed
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    const sterilized = petArr[i].sterilized
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    //HTML Code - Đổi màu btnEdit và function khi click vào button EDIT
    row.innerHTML = `<th>${petArr[i].id}</th> <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td><td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td><td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td><i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i></td>
    <td><i class="${vaccin}"></td>
    <td><i class="${dewormed}"></i></td>
    <td><i class="${sterilized}"></i></td>
    <td>${petArr[i].date}</td>
    <td><button class="btn btn-warning" onclick="startEditPet('${petArr[i].id}')">Edit</button></td>`;
    tableBody.appendChild(row);
  }
};
renderTableEdit(petArr);
// Hàm Edit các Pet khi ấn vào button EDIT
const startEditPet = function (petID) {
  // Hiện form để Edit
  form.classList.remove("hide");
  // Tìm pet có ID tương ứng để Edit
  let pet = petArr.find((pet) => pet.id == petID);
  // Hiện lại value cho các thuộc tính của Pet
  idInput.value = pet.id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  breedInput.value = pet.breed;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
  // Render lại trường Breed
  const renderBreed = function (bo) {
    for (let i = 0; i < bo.length; i++) {
      const options = bo[i].breed;
      //Chèn các options vào HTML
      const option = document.createElement("option");
      option.innerHTML = `<option>${options}</option>`;
      breedInput.appendChild(option);
    }
  };
  //1. Khi người dùng chọn sửa Breed đầu tiên => hiện list Breed dựa vào Type có sẵn
  if (typeInput.value === pet.type) {
    //Lọc các Breed có sẵn
    const breedOption = breedArr.filter(function (breed) {
      //Tìm Breed của Type có sẵn
      //Bỏ qua Breed của Pet đang được Edit để tránh hiện 2 lần
      if (breed.type === pet.type) return breed.breed !== pet.breed;
    });
    //Chèn breed của Pet đang được Edit
    breedInput.innerHTML = `<option>${pet.breed}</option>`;
    //Render lại trường Breed theo Type
    renderBreed(breedOption);
  }

  //2. Khi người dùng sửa Type trước => hiện list Breed theo type đã sửa
  typeInput.onchange = function () {
    const breedOption = breedArr.filter(function (breed) {
      //Tìm Breed có Type phù hợp
      if (breed.type === typeInput.value) return breed.breed;
    });
    breedInput.innerHTML = `<option value = "select">Select Breed</option>`;
    renderBreed(breedOption);
  };
};
// Validate dữ liệu Input
const validateData = function () {
  // 1. Name check
  const checkName = function () {
    if (!nameInput.value) {
      alert("Please input Name!");
      return false;
    } else return true;
  };
  // 2. Age Check
  const checkAge = function () {
    if (!ageInput.value) alert("Please input Age!");
    if (ageInput.value < 1 || ageInput.value > 15) {
      alert("Age must be between 1 and 15!");
      return false;
    } else return true;
  };
  // 3. Type check
  const checkType = function () {
    if (typeInput.value === "select") {
      alert("Please select Type!");
      return false;
    } else return true;
  };
  //4. Weight check
  const checkWeight = function () {
    if (!weightInput.value) alert("Please input Weight!");
    if (weightInput.value < 1 || weightInput.value > 15) {
      alert("Weight must be between 1 and 15!");
      return false;
    } else return true;
  };
  //5. Length check
  const checkLength = function () {
    if (!lengthInput.value) alert("Please input Length!");
    if (lengthInput.value < 1 || lengthInput.value > 100) {
      alert("Length must be between 1 and 100!");
      return false;
    } else return true;
  };
  //6. Breed check
  const checkBreed = function () {
    if (breedInput.value === "select") {
      alert("Please select Breed!");
      return false;
    } else return true;
  };
  if (
    checkName() &&
    checkAge() &&
    checkType() &&
    checkWeight() &&
    checkLength() &&
    checkBreed()
  )
    return true;
};
// Bắt sự kiện khi user ấn Submit
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
  };
  //Tìm pet có ID tương ứng
  let pet = petArr.find((pet) => pet.id === data.id);
  //Gán date cũ cho data mới edit
  data.date = pet.date;
  //Tìm index của pet cần Edit
  const i = petArr.indexOf(pet);
  //Gán dữ liệu mới vào mảng petArr
  petArr[i] = data;
  //Validate dữ liệu
  if (validateData(data)) {
    //Ẩn form sau Edit
    form.classList.add("hide");
    //Chạy hàm render dữ liệu lên trình duyệt
    renderTableEdit(petArr);
    //Lưu dữ liệu mới vào localStorage
    saveToStorage("petArr", petArr);
  }
});
