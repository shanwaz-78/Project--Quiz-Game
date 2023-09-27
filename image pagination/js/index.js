const imageContainer = document.getElementById("imageContainer");
const scrollBtn = document.querySelector("i");
const seeMoreBtn = document.getElementById("btn");

let currentImgCounter = 1;
function generateImages() {
  for (let i = 0; i < 5; i++) {
    const API_URL = `https://picsum.photos/300?random=${i}`;
    const imgElement = document.createElement("img");
    imgElement.src = API_URL;
    imageContainer.appendChild(imgElement);
    currentImgCounter++;
  }
  return currentImgCounter;
}

function showScrollBtn() {
  const currentImgCounter = generateImages();
  currentImgCounter === 11
    ? (scrollBtn.style.visibility = "visible")
    : "hidden";
}

seeMoreBtn.addEventListener("click", showScrollBtn);
scrollBtn.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

showScrollBtn();
