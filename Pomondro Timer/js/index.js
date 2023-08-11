const minutes = document.querySelector("span");
const buttonsParent = document.getElementById("buttons");
const seconds = document.querySelector("span p");

function start_timer() {
  seconds.innerText = 59;
  let subtractMinute = parseInt(minutes.innerText);

  const interval = setInterval(() => {
    if (seconds.innerText <= 0) {
      if (subtractMinute > 0) {
        subtractMinute--;
        seconds.innerText = 59;
      } else {
        clearInterval(interval);
        return;
      }
    }
    seconds.innerText--;
  }, 1000);

  manage_buttons(interval);
}

function manage_buttons(interval) {
  buttonsParent.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.id === "start") {
      start_timer();
    } else if (event.target.id === "stop") {
      clearInterval(interval);
    } else if (event.target.id === "reset") {
      location.reload();
    }
  });
}

manage_buttons();
