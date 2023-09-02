const userInput = document.getElementById("userInput");
const addBtn = document.getElementById("add-btn");
const showToDo = document.getElementById("show-todo");

function generateToDo() {
  const userInputValue = userInput.value;
  if (userInputValue.trim() === "") {
    alert("Cannot be empty");
    return;
  }
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  li.textContent = userInputValue;
  ul.appendChild(li);
  showToDo.appendChild(ul);
  showToDo.style.display = "block";
  userInput.value = "";
  addToDoIcon(ul, li);
}

function addToDoIcon(ul, li) {
  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa fa-trash";
  li.appendChild(deleteIcon);
  manipulateIcons(ul, deleteIcon);
}

function manipulateIcons(ul, deleteIcon) {
  deleteIcon.addEventListener("click", (event) => {
    event.preventDefault();
    ul.remove();
  });
}

addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  generateToDo();
});
