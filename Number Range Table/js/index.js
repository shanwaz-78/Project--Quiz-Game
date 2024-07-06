const btn = document.getElementById("btn");
function generateTable() {
  const startNumber = document.getElementById("start-number").value.toLowerCase().trim();
  const endNumber = document.getElementById("end-number").value.toLowerCase().trim();
  const numberTable = document.getElementById("number-table");
  const converStartNum = parseInt(startNumber);
  const convertEndNum = parseInt(endNumber);
  if (converStartNum === "" || convertEndNum === "") {
    alert("Please enter a number");
    return;
  }
  numberTable.innerHTML = '';
  for (let i = converStartNum; i <= convertEndNum; i++) {
    const tableContainer = document.createElement("div");
    tableContainer.className = "table-container";
    const table = document.createElement("table");
    const row = document.createElement("tr");
    const tHeading = document.createElement("th");
    tHeading.textContent = `${i}`;
    row.appendChild(tHeading);
    table.appendChild(row);
    for (let j = 1; j <= 10; j++) {
      const row = document.createElement("tr");
      const tData = document.createElement("td");
      tData.textContent = `${j * i}`;
      tData.addEventListener("click", function () {
        divisibleNumbers(i * j);
      });
      tData.className = "number-cell";
      row.appendChild(tData);
      table.appendChild(row);
    }
    tableContainer.appendChild(table);
    numberTable.appendChild(tableContainer);
  }
}

function divisibleNumbers(number) {
  const cells = document.getElementsByClassName("number-cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("highlight");
  }

  for (let i = 0; i < cells.length; i++) {
    if (parseInt(cells[i].textContent) % number === 0) {
      cells[i].classList.add("highlight");
    }
  }
}

btn.addEventListener("click", (event) => {
  generateTable();
});
