const sendButton = document.querySelector(".chat-input i");
const userInput = document.querySelector("textarea");
const chatbox = document.querySelector(".chatbox");
const showChatBot = document.querySelector(".show-chatbot");
const chatbotToggler = document.querySelector(".chatbot-toggler i");

const API_KEY = "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";

function handleChat() {
  const userMessage = userInput.value.trim().toLowerCase();
  if (!userMessage) return;
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  userInput.value = "";
  setTimeout(() => {
    chatbox.appendChild(createChatLi("Thinking...", "incoming"));
    generateResponse(userMessage);
  }, 600);
}

async function generateResponse(userMessage) {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    }),
  };
  fetch(API_URL, requestOptions).then(data => data.json()).then(resul => console.log(resul))
}
function addOutgoingMsg() {
  handleChat();
}

function createChatLi(userMessage, className) {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  chatLi.innerHTML = `<p>${userMessage}</p>`;
  return chatLi;
}

sendButton.addEventListener("click", (event) => {
  event.preventDefault();
  addOutgoingMsg();
});
userInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter" || event.key === "ENTER") {
    event.preventDefault(); // Prevent to go to the next line.
    sendButton.click()
  }
});
