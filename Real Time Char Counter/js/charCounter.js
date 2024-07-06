const input = document.getElementById("input");
const char_counter = document.getElementById("counter");
const remaining_counter = document.getElementById("remaining");
const copy_btn = document.getElementById("btn");

input.innerHTML = "";

input.addEventListener("input", (e) => {
  if (e.target.value) {
    char_counter.innerText = e.target.value.length;
    remaining_counter.innerText = 150 - e.target.value.length;
  }
  if (e.target.value.length > 1) {
    copy_btn.style.visibility = "visible";
  } else {
    copy_btn.style.visibility = "hidden";
  }
});

copy_btn.addEventListener("click", (event) => {
  event.preventDefault();
  input.select();
  input.setSelectionRange(0, input.value.length);
  document.execCommand("copy");
});
