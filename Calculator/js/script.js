const display = document.getElementById("display");
const inputs = document.querySelectorAll('input[type="button"]');

function displayElem() {
  inputs.forEach((elem) => {
    elem.addEventListener("click", (event) => {
      event.preventDefault();
      display.value += elem.value;
      // clear input value;
      if (event.target.value === "AC") {
        display.value = "";
      } else if (event.target.value === "DE") {
        // clear only one value from display
        display.value = display.value.slice(0, -1);
      } else if (event.target.value === "=") {
        display.value = eval(display.value);
      }
    });
  });
}

displayElem();
