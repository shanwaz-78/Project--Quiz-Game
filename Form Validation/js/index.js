const inputs = document.querySelectorAll("input");

const patterns = {
  username: /^[a-z\d]{5,17}$/gi,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  password: /^[\w@-]{8,20}$/gi,
  telephone: /^\d{10}$/g,
};

function validate(field, regex) {
  if (regex.test(field.value)) {
    field.className = "valid";
  } else {
    field.className = "inValid";
  }
}

inputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    validate(event.target, patterns[event.target.attributes.name.value]);
  });
});
