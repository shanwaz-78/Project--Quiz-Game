document.addEventListener("DOMContentLoaded", function () {
  const loadingFill = document.getElementById("loading-fill");
  const loadingText = document.getElementById("loading-text");
  const loadingBar = document.getElementById("loading-bar");
  const startButton = document.getElementById("startButton");
  const stopButton = document.getElementById("stopButton");

  let percentage = 0;
  let animationId;

  function updateLoading() {
    if (percentage <= 100) {
      loadingFill.style.setProperty("--loading-progress", percentage + "%");
      loadingText.textContent = percentage + "%";
      percentage++;
      animationId = requestAnimationFrame(updateLoading);
    }
  }

  startButton.addEventListener("click", () => {
    if (!animationId) {
      percentage = 0;
      updateLoading();
    }
  });

  stopButton.addEventListener("click", () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  });
});
