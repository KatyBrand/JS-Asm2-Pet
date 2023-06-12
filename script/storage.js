"use strict";
//Ẩn hiện navbar với toogle
const nav = document.getElementById("sidebar");

nav.addEventListener("click", function (e) {
  // e.preventDefault();
  e.stopPropagation();
  this.classList.toggle("active");
});
//Khai báo biến
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const btnDanger = document.querySelector(".btn-danger");
const btnHealthy = document.getElementById("healthy-btn");
//Biến mới so với ASM1
const breedArr = getFromStorage("breedArr");
const petArr = getFromStorage("petArr");
const tableBody = document.getElementById("tbody");
const form = document.getElementById("container-form");
const btnFind = document.getElementById("find-btn");
//Khai báo object dữ liệu mặc định trong localstorage
const data1 = {
  id: "P001",
  name: "Dober Mix",
  age: 3,
  type: "Dog",
  weight: 12,
  length: 87,
  color: "#e08f8f",
  breed: "Doberman Pinscher",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: "03/04/2022",
};
const data2 = {
  id: "P002",
  name: "Charlie Tux",
  age: 4,
  type: "Cat",
  weight: 4,
  length: 65,
  color: "#8cee9c",
  breed: "Tabby",
  vaccinated: true,
  dewormed: false,
  sterilized: false,
  date: "05/07/2022",
};
const data3 = {
  id: "P003",
  name: "Sweetie Pie",
  age: 3,
  type: "Dog",
  weight: 6,
  length: 45,
  color: "#ff1414",
  breed: "Husky",
  vaccinated: false,
  dewormed: false,
  sterilized: true,
  date: "06/08/2022",
};
//DL Breed
const breed1 = {
  type: "Dog",
  breed: "Doberman Pinscher",
};
const breed2 = {
  type: "Cat",
  breed: "Tabby",
};
const breed3 = {
  type: "Dog",
  breed: "Husky",
};
//Nếu petArr trống thì lấy dữ liệu bên trên
if (!getFromStorage("petArr")) {
  saveToStorage("petArr", [data1, data2, data3]);
}
//Chuyển đổi đối tượng khi lấy từ LStorage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
//Chuyển đổi đối tượng thành string khi lưu vào LStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//Nếu breedArr trống thì lấy dữ liệu bên trên
if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr", [breed1, breed2, breed3]);
}

//CHO PAGE BREED
//Render breed + type vào HTML khi người dùng nhập breed mới
const renderBreedTable = function (breedArr) {
  tableBody.innerHTML = "";
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${i + 1}</td>
    <td>${breedArr[i].breed}</td>
    <td>${breedArr[i].type}</td>
    <td><button class="btn btn-danger" onclick="deleteBreed('${
      breedArr[i].breed
    }')">Delete</button></td>`;
    //Chèn thêm 1 hàng
    tableBody.appendChild(row);
  }
};

//Hàm xóa dữ liệu đầu vào
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  weightInput.value = "";
  lengthInput.value = "";
  typeInput.value = "select";
  breedInput.value = "select";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};
//Render dữ liệu cho Homepage và Search (Trang Edit rendertable khác)
const renderTableData = function (petArr) {
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
    //Toán tử 3 ngôi tính BMI (hoặc hiện '?') dựa vào giá trị boolean của BMICheck
    //HTML Code
    row.innerHTML = `<th>${petArr[i].id}</th> <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td><td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td><td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td><i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i></td>
    <td><i class="${vaccin}"></td>
    <td><i class="${dewormed}"></i></td>
    <td><i class="${sterilized}"></i></td>
    <td>${petArr[i].date}</td>
    <td><button class="btn btn-danger" onclick="deletePet('${petArr[i].id}')">Delete</button></td>`;
    //Chèn thêm 1 hàng
    tableBody.appendChild(row);
  }
};
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
