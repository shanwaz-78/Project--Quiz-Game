const inputField = document.getElementById("userInput");
const formatBtns = document.querySelectorAll(".btn");
const copyBtn = document.getElementById("copy");
const outputField = document.getElementById("output");

function handleUserInput() {
  outputField.textContent = inputField.value;
}

function handleBtnAnimation(prefix = "animate__") {
  formatBtns.forEach((btn) =>
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      btn.classList.add(
        `${prefix}animated`,
        `${prefix}rubberBand`,
        `${prefix}faster`
      );
      setTimeout(() => {
        btn.classList.remove(`${prefix}rubberBand`);
      }, 800);
    })
  );
}

function handleBtnOptions() {
  formatBtns.forEach((btn) =>
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const clientGiveValue = inputField.value;
      switch (btn.textContent) {
        case "ABC":
          outputField.textContent = clientGiveValue.toUpperCase();
          break;
        case "abc":
          outputField.textContent = clientGiveValue.toLowerCase();
          break;
        case "Abc":
          outputField.textContent = clientGiveValue
            .trim()
            .split(" ")
            .map((elem) => elem.charAt(0).toUpperCase() + elem.slice(1).toLowerCase())
            .join(" ");
          break;
        case "Bold":
          outputField.innerHTML = `<strong>${clientGiveValue}</strong>`;
          break;
        case "Italic":
          outputField.innerHTML = `<em>${clientGiveValue}</em>`;
          break;
        case "Underline":
          outputField.innerHTML = `<u>${clientGiveValue}</u>`;
          break;
        default:
          throw new Error(`Select Right Option`);
          break;
      }
    })
  );
}
handleBtnAnimation();
handleBtnOptions();
inputField.addEventListener("input", handleUserInput);
