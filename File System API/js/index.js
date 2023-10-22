const wrapper = document.getElementsByClassName("wrapper")[0];
const saveButton = document.getElementById("saveButton");
const displayContent = document.querySelector(".displayContent");
const recordedChunks = []
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

async function captureScreen(mediaDeviceOptions) {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia(
      mediaDeviceOptions
    );
    const mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorder.ondataavailable = function (event) {
      recordedChunks.push(event.data);
    };
    mediaRecorder.onstop = function () {
      const blob = new Blob(recordedChunks, { type: recordedChunks[0].type });
      const objectURL = URL.createObjectURL(blob);
      recorded.src = objectURL;
    };
    mediaRecorder.start();
    preview.srcObject = mediaStream;
  } catch (error) {
    console.log("Error", error);
  }
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
