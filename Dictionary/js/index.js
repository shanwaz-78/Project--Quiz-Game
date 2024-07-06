const userInput = document.getElementById("input");
const buttonsWrapper = document.getElementsByClassName("button-wrapper")[0];
const output = document.getElementsByClassName("output")[0];

async function fetchDictionary(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
	throw new Error(`Word Details not Found`);
    }
    const data = await response.json();
    const { definitions } = data[0].meanings[2];
    return definitions;
  } catch (error) {
    console.log(error.message, error);
    throw error;
  }
}

async function generateDefinitions(url, id) {
  const definitions = await fetchDictionary(url);
  output.innerHTML = "";

  const closeIcon = document.createElement("i");
  closeIcon.className = "fas fa-times close-icon";

  closeIcon.addEventListener("click", () => {
    output.style.display = "none";
  });

  output.appendChild(closeIcon);

  definitions.forEach(({definition, example}) => {
    const lineBreak = document.createElement("br");
    const li = document.createElement("li");

    if (id === "definitions") {
      li.textContent = definition;

      output.appendChild(li);
      output.appendChild(lineBreak);
    } else {
      li.textContent = example;

      output.appendChild(li);
      output.appendChild(lineBreak);
    }
  });

  output.style.display = "block";
}

buttonsWrapper.addEventListener("click", (event) => {
  event.preventDefault();
  const {value} = userInput;
  const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${value.trim()}`;

  if (event.target.id === "definitions") {
    generateDefinitions(API_URL, event.target.id);
  } else if (event.target.id === "examples") {
    generateDefinitions(API_URL, event.target.id);
  }

});
