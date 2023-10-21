const wrapper = document.getElementsByClassName("wrapper")[0];
const saveButton = document.getElementById("saveButton");
const displayContent = document.querySelector(".displayContent");
const fileReader = new FileReader();
let modifiedContent = "";

function enableFileReading() {
  fileInput.addEventListener("change", (event) => {
    event.preventDefault();
    fileReader.addEventListener("load", () => {
      displayContent.textContent = fileReader.result;
    });
    fileReader.readAsText(event.target.files[0]);
    saveButton.style.display = "inline";
  });
  fileInput.click();
}

function saveModifiedData() {
  modifiedContent = displayContent.textContent;
  const blob = new Blob([modifiedContent], { type: "text/plan" });
  const downloadaBle = document.createElement("a");
  downloadaBle.href = URL.createObjectURL(blob);
  downloadaBle.download = "Modified.html";
  downloadaBle.style.display = "none";
  document.body.appendChild(downloadaBle);
  downloadaBle.click();
  document.body.removeChild(downloadaBle);
}

wrapper.addEventListener("click", (event) => {
  if (event.target.id === "btn") {
    enableFileReading();
  } else if (event.target.id === "saveButton") {
    saveModifiedData();
  }
});
