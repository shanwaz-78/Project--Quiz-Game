const h3Elem = document.getElementById("color-code");
let randomCode;
function generateRandomColor() {
  const randomNumber = parseInt(Math.random() * 16777215);
  randomCode = "#" + randomNumber.toString(16);
  document.body.style.backgroundColor = randomCode;
  h3Elem.innerText = randomCode;
}

document.addEventListener("click", (event) => {
  event.preventDefault();

  if (event.target.id === "btn") {
    generateRandomColor();
  } else if (event.target.id === "btn2") {
    navigator.clipboard.writeText(randomCode);
  }
});

// init color
generateRandomColor();
