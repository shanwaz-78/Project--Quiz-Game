const tableBody = document.querySelector("tbody");
const paginationNumbers = document.querySelectorAll("a");

const itemsPerPage = 5;
let currentPage = 1;

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error at fetchData Function`);
    }
    const data = await response.json();
    showData(data.users);
  } catch (error) {
    console.error(error);
  }
}

tableBody.innerHTML = ""; // Clear existing rows
function showData(data) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  for (let i = startIndex; i < endIndex && i < data.length; i++) {
    const userData = data[i];
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${userData.id}</td>
      <td>${userData.firstName}</td>
      <td>${userData.email}</td>
      <td>${userData.phone}</td>
    `;
    tableBody.appendChild(row);
  }
}
function handleNumberChange() {
  paginationNumbers.forEach((number) => {
    number.addEventListener("click", (event) => {
      event.preventDefault();
      paginationNumbers.forEach((num) => num.classList.remove("active"));
      event.target.classList.add("active");
      fetchData("https://dummyjson.com/users");
    });
  });
}
handleNumberChange();

fetchData("https://dummyjson.com/users");
