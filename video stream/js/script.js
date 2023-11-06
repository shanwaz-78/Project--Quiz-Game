const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stopBtn");
const preview = document.getElementById("preview");
const videoElem = document.getElementById("record");
let mediaRecorder;
let recordedChunks = [];

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event) => {
      recordedChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      videoElem.src = url;
    };
    mediaRecorder.start();
    preview.srcObject = stream;
  } catch (error) {
    console.log("Error:", error);
  }
}

stopBtn.addEventListener("click", () => mediaRecorder.stop());
startBtn.addEventListener("click", startRecording);
