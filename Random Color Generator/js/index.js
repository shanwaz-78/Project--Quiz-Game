const container = document.getElementById("container");
const wrapper = document.getElementById("wrapper");

function generateRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function changeColorCode(container, randomColorCode) {
  const colorCodeContainer = container.querySelector(".color-code");
  console.log(colorCodeContainer);
  colorCodeContainer.textContent = randomColorCode;
}

function generateColorForContainer(container) {
  const randomColor = generateRandomColor();
  container.style.backgroundColor = randomColor;
  changeColorCode(container, randomColor);
}

function generateMoreContainers() {
  for (let i = 0; i < 40; i++) {
    const div = document.createElement("div");
    div.classList.add("color-container");

    const colorCode = document.createElement("div");
    colorCode.classList.add("color-code");

    div.appendChild(colorCode);
    container.appendChild(div);

    generateColorForContainer(div);
  }
}

wrapper.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id === "btn") {
    window.location.reload();
  }
});
generateMoreContainers();
