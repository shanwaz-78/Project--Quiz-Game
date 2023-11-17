const button = document.getElementById("double-sizes");
const boxes = Array.from(document.querySelectorAll(".box"));

function calculateNewWidths() {
  return boxes.map((box) => box.offsetWidth * 2);
}

function applyNewWidths(newWidths) {
  requestAnimationFrame(() => {
    boxes.forEach((box, index) => {
      box.style.width = `${newWidths[index]}px`;
    });
  });
}

function modifyData() {
  const newWidths = calculateNewWidths();
  applyNewWidths(newWidths);
}

button.addEventListener("click", modifyData);
