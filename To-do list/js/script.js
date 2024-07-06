const userInput = document.getElementById("userInput");
const addBtn = document.getElementById("add-btn");
const todoWrapper = document.getElementsByClassName("todo-container")[0];
const showToDo = document.getElementById("show-todo");

function generateToDo() {
  const userInputValue = userInput.value.trim();
  if (userInputValue === "") {
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
    ul.classList.add("animate__animated", "animate__hinge");
    setTimeout(() => {
      ul.remove();
    }, 2000);
  });
}

addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  generateToDo();
});
document.addEventListener("DOMContentLoaded", () => {
  todoWrapper.classList.add("animate__animated", "animate__bounce");
});
