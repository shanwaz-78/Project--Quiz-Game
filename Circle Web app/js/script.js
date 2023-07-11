let currentCirlce = null;

function createCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  const size = randomSize(10, 201);
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.background = randomColor();
  document.body.appendChild(circle);
  return circle;
}
currentCirlce = createCircle();

document.addEventListener("click", (event) => {
  currentCirlce = createCircle();
  currentCirlce.style.top = event.clientY + "px";
  currentCirlce.style.left = event.clientX + "px";
});

document.addEventListener("mousemove", (event) => {
  currentCirlce.style.top = event.clientY + "px";
  currentCirlce.style.left = event.clientX + "px";
});
function randomSize(min, max) {
  const randomNumber = parseInt(Math.random() * (max - min) + min);
  return randomNumber;
}
function randomColor() {
  const randomNum = Math.floor(Math.random() * 16777215);
  const ramdomCode = "#" + randomNum.toString(16);
  return ramdomCode;
}
