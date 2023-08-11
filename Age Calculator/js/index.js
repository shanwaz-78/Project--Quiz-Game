const dateInput = document.getElementById("dateInput");
const btn = document.getElementById("btn");
const result = document.getElementById("result");

function calculate_age() {
  if (dateInput.value === "") {
    alert("Please Select Your Date of Birth");
    return;
  }
  const currentYear = new Date().getFullYear();
  const birtYear = dateInput.value.split("-");
  const actualAge = currentYear - birtYear[0];
  result.style.display = "inline";
  result.innerText = `Your Age is ${actualAge} years Old`;
}

btn.addEventListener("click", (event) => {
  event.preventDefault();
  calculate_age();
});
