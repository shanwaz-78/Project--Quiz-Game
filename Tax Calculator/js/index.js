const formElement = document.getElementById("tax-form");
const resultContainer = document.querySelector(".message");

function isValidData(userData) {
  const checkChars = /[a-z]/gi;
  for (const key in userData) {
    if (userData[key].match(checkChars) && key !== "ageGroup") {
      showErrorIcon(key);
      return false;
    }
  }
  return true;
}

function showErrorIcon(errorColumn) {
  const columns = formElement.querySelectorAll(`[name="${errorColumn}"]`);
  columns.forEach((column) => {
    const errorText = column.parentNode.parentNode.querySelector(".error-text");
    column.nextElementSibling.style.display = "block";
    column.nextElementSibling.addEventListener("mouseenter", () => {
      errorText.style.display = "block";
    });
    column.nextElementSibling.addEventListener("mouseleave", () => {
      errorText.style.display = "none";
    });
  });
}

function handleFormSubmit() {
  const formData = new FormData(formElement);
  const userData = Object.fromEntries(formData);
  const validData = isValidData(userData);
  return validData ? userData : null;
}

function generateResult() {
  const taxCapacity = 800000;
  const userData = handleFormSubmit();
  const { annualIncome, extraIncome, ageGroup, totalDeductions } = userData;
  const totalIncome = +annualIncome + +extraIncome - totalDeductions;

  let finalIncome = null;

  if (totalIncome <= taxCapacity) {
    finalIncome = totalIncome;
  } else {
    const taxableAmount = totalIncome - taxCapacity;
    switch (ageGroup) {
      case "Less then 40":
        finalIncome = taxCapacity + taxableAmount * 0.3;
        break;
      case "40 to 60":
        finalIncome = taxCapacity + taxableAmount * 0.4;
        break;
      case "60 plus":
        finalIncome = taxCapacity + taxableAmount * 0.1;
        break;
      default:
        break;
    }
  }
  return finalIncome;
}

function showResult(e) {
  e.preventDefault();
  const finalIncome = generateResult();
  resultContainer.innerHTML = "";
  resultContainer.innerHTML = `
    <h2>Your overall income will be <br/> ${finalIncome} <br/> After tax deductions.</h2>
  `;
  resultContainer.style.display = "block";
}

formElement.addEventListener("submit", showResult);
