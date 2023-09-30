const sortableList = document.getElementById("sortable-list");
const themeIconWrapper = document.getElementById("darkTheme");
const heading = document.querySelector("h2");

function enableDragging() {
  const sortableOptions = {
    animation: 200,
    ghostClass: "drag",
    onUpdate: () => {
      const sortableItems = document.querySelectorAll(".sortable-item");
      const order = Array.from(sortableItems).map((item) => item.textContent);
      localStorage.setItem("definedOrder", JSON.stringify(order));
    },
  };
  const sortable = new Sortable(sortableList, sortableOptions);
  return sortable;
}

function changeOrder() {
  const items = document.querySelectorAll(".sortable-item");
  const getItems = localStorage.getItem("definedOrder");
  const order = JSON.parse(getItems);
  items.forEach((item, index) => {
    item.textContent = order[index];
  });
}

function changeIconColors() {
  const icon = document.getElementById("icon");
  const themeIconWrapper = document.querySelector(
    ".themeIconWrapper .theme-icon"
  );
  const body = document.body;

  if (icon.classList.contains("iconAnimation")) {
    body.style.backgroundColor = "#0f0f0f";
    themeIconWrapper.style.borderColor = "#ffff";
    icon.style.color = "#fff";
    heading.style.color = "#ffff";
  } else {
    body.style.backgroundColor = "#ffff";
    themeIconWrapper.style.borderColor = "#0f0f0f";
    icon.style.color = "#0f0f0f";
    heading.style.color = "#0f0f0f";
  }
}

function toggleIconAnimation() {
  const icon = document.getElementById("icon");
  icon.classList.toggle("iconAnimation");
  changeIconColors();
  if (!icon.classList.contains("iconAnimation")) {
    icon.classList.toggle("removeAnimation");
    changeIconColors();
  }
}

themeIconWrapper.addEventListener("click", toggleIconAnimation);
document.addEventListener("DOMContentLoaded", () => {
  enableDragging();
  changeOrder();
});
