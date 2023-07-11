const btn = document.getElementById("generate-btn");
const passwordDisplay = document.getElementById("password-display");

function generateRandomPassword() {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const char = "abcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 1; i <= 6; i++) {
      password += char
        .charAt(parseInt(Math.random() * char.length))
        .toUpperCase();
    }
    passwordDisplay.innerText = password;
  });
}
generateRandomPassword();