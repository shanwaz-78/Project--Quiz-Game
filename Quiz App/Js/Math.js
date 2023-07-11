// JavaScript
const quizDB = [
  {
    Q: "Q1. What is the highest common factor of the numbers 30 and 132",
    ans: 6,
  },
  {
    Q: "Q2. 123+4-5+67-89 = ? ",
    ans: 100,
  },
  {
    Q: "Q3. What is next in the following number series: 256, 289, 324, 361 . . . ?",
    ans: 400,
  },
  {
    Q: "Q4. At a Christmas party, everyone shook hands with everyone else. There were a total of 66 handshakes that happened during the party. How many people were present?",
    ans: 12,
  },
  {
    Q: "Q5. What is the value of Pi to four individual decimal places?",
    ans: 3.1416,
  },
  {
    Q: "Q6. What does 6 raise to the power of 0 equal? ",
    ans: 1,
  },
  {
    Q: "Q7. A car is traveling at the rate of 75 kilometers per hour. How many meters is the car traveling in one minute?",
    ans: 1250,
  },
  {
    Q: "Q8. What if 3 ^ 5 ? (POW)",
    ans: 243,
  },
  {
    Q: "Q9. Calculate the Integers 10 + 2 * 4 - 1 ?",
    ans: 17,
  },
  {
    Q: "Q10. What one numbers result in the same answer when they are added or multiplied altogether? ",
    ans: 1,
  },
];

// target Question field;
const title = document.querySelector("#title");
// target Answers field;
const answer = document.querySelector(".answer");
// target Scoring box;
const showScore = document.querySelector("#showScore");
// target Submit Button;
const Submit = document.querySelector("#Submit");
// target feedBack option;
const feedBack = document.querySelector("#feedback");

let Score = 0;
let questionCount = 0;
let incorrectAnswers = 0;

// ---- Change Options and Start Timer ------
const loadQuestion = () => {
  // load questions and options
  title.innerHTML = quizDB[questionCount].Q;
};
loadQuestion();

// --- get the user input and check the answer ---;
const checkAnswer = () => {
  const userAnswer = parseInt(answer.value);
  if (userAnswer === quizDB[questionCount].ans) {
    Score++;
    answer.value = "";
    return true;
  } else {
    incorrectAnswers++;
    answer.value = "";
    return false;
  }
};

// check the user input on submit;
Submit.addEventListener("click", () => {
  const isCorrect = checkAnswer();

  if (isCorrect) {
    questionCount++;
  } else {
    questionCount++;
  }
  // load next question
  if (questionCount < quizDB.length) {
    loadQuestion();
  } else {
    // show the score
    showScore.innerHTML = `<h3>You Scored ${Score} / ${quizDB.length}</h3>
    <p>Incorrect Answers: ${incorrectAnswers}</p>
    <button class='btn' onclick='location.reload()'> Play Again </button>`;
    showScore.style.display = "block";
    // hide the submit button
    Submit.style.display = "none";

    feedBack.addEventListener("click", (page) => {
      page.preventDefault();

      const userThought = prompt("Please Share Your Thoughts");
      console.log(userThought);
    });
  }
});

function categoryChange() {
  var selectedCategory = document.getElementById("categories").value;
  // open true-false.html
  if (selectedCategory == "True-False") {
    window.location.href = "../html/true-false.html";
  }
  // open Quiz.html
  if (selectedCategory == "MCQ") {
    window.location.href = "../html/quizPage.html";
  }
}
