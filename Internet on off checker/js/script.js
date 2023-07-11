const popup = document.querySelector(".popup");
let isOnline = true,
  interlId,
  timer = 10;

const checkConnection = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    isOnline = response.status >= 200 && response.status < 300;
  } catch (error) {
    isOnline = false;
  }
  clearInterval(interlId);
  timer = 10;
  handlePopUp(isOnline);
};

function handlePopUp(status) {
  if (status) {
    return popup.classList.remove("show");
  }
  popup.classList.add("show");
  interlId = setInterval(() => {
    timer--;
    if (timer === 0) checkConnection();
    popup.querySelector(".desc   span").innerText = timer;
  }, 1000);
}
// check the connection status in every 2 seconds;
setInterval(checkConnection, 2000);
