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
      const blob = new Blob(recordedChunks, { type: recordedChunks[0].type });
      const url = URL.createObjectURL(blob);
      videoElem.src = url;
    };
    preview.srcObject = stream;
  } catch (error) {
    console.log("Error:", error);
  }
}

startBtn.addEventListener("click", startRecording);
