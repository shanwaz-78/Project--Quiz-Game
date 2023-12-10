import 'dotenv/config'
const sendButton = document.querySelector(".chat-input i");
const userInput = document.querySelector("textarea");
const chatbox = document.querySelector(".chatbox");
const showChatBot = document.querySelector(".show-chatbot");
const chatbotToggler = document.querySelector(".chatbot-toggler i");

const API_KEY = process.env.API_KEY;

function handleChat() {
  const userMessage = userInput.value.trim().toLowerCase();
  if (!userMessage) return;
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  userInput.value = "";
  setTimeout(() => {
    chatbox.appendChild(createChatLi("Thinking...", "incoming"));
    handleUserInput(userMessage);
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
  const response = await fetch(API_URL, requestOptions);
  const data = await response.json();
  const chatbotResponse = data.choicee.message.content;
  chatbox.appendChild(createChatLi(chatbotResponse, "incoming"));
  console.log(data);
}

function handleUserInput(userMessage) {
  if (userMessage.includes("hello")) {
    generateResponse("Hello there!");
  } else if (userMessage.includes("help")) {
    generateResponse("How can I assist you?");
  } else {
    generateResponse(userMessage);
  }
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
    event.preventDefault();
    sendButton.click();
  }
});

showChatBot.addEventListener("click", () => {
  chatbox.classList.remove("hidden");
});

chatbotToggler.addEventListener("click", () => {
  chatbox.classList.toggle("hidden");
});
