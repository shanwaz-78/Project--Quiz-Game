const userName = document.querySelector(".UserName").value;
const password = document.querySelector(".password").value;
const submitButton = document.querySelector("#Submit-button");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const userConfrim = confirm("Login Successful");
  if (userConfrim) {
    window.location.href = "../html/quizPage.html";
  }
});