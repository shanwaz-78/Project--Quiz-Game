const question_field = document.getElementById("question");
const submit_btn = document.getElementById("submit");
const options = document.querySelectorAll("label");
let tiemr = document.getElementById("timer");

let current_question_count = 0;

// Show First Question.
document.addEventListener("DOMContentLoaded", handle_question_change);

async function handle_question_change(event) {
  event.preventDefault();
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=20&category=19&type=multiple"
    );
    if (!response.ok) {
      throw new Error("Error at handle_question_change....");
    }
    const data = await response.json();
    question_field.innerText = data.results[current_question_count].question;
    handle_options(data.results[current_question_count]);
    change_timer(data);
  } catch (error) {
    console.error(error);
  }
}

function handle_options(questionData) {
  const optionsData = [
    ...questionData.incorrect_answers,
    questionData.correct_answer,
  ];
  options.forEach((option, index) => (option.innerText = optionsData[index]));
}

// change timer;
function change_timer(questionData) {
  setInterval(() => {
    tiemr.innerText--;
    if (tiemr.innerText <= 0) {
      tiemr.innerText = 15;
      current_question_count++;
      question_field.innerText =
        questionData.results[current_question_count].question;
      handle_options(questionData.results[current_question_count]);
    }
  }, 1000);
}

submit_btn.addEventListener("click", handle_question_change);
