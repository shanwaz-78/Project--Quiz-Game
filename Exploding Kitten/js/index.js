import images from '../images/imagesURL.js'
const imageBoxes = Array.from(document.querySelectorAll(".box"));
const nameField = document.querySelector(".username h3 > span");

document.addEventListener("DOMContentLoaded", () => {

  function isNameGiven() {
    const userName = prompt(`Enter Your Name To Play Game`);
    if (userName === null || userName.trim() === "") {
      return isNameGiven();
    }
    return userName;
  }

  function randomNumber(imageBoxesLength) {
    const number = Math.floor(Math.random() * imageBoxesLength);
    return number;
  }

  function setImagesRandomly(images) {
    const userName = isNameGiven();
    nameField.textContent = userName;

    imageBoxes.forEach((imageBox) => {
      imageBox.addEventListener("click", () => {
        const randomIndex = randomNumber(imageBoxes.length);
        imageBox.style.backgroundImage = `url(${images[randomIndex]})`;
      });
    });
  }

  function fullScreenFeature() {
    document.addEventListener("keypress", (e) => {
      if (e.key === "f" || (e.key === "F" && !document.fullscreenElement)) {
        document.body.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
  }
  fullScreenFeature();

  setImagesRandomly(image);
});
