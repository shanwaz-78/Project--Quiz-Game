import quizDB from '../questions.js';
const questionForm = document.getElementById('ques-form');
const allInput = document.getElementById('all-inputs');
// target Scoring box;
const showScore = document.querySelector('#showScore');
// target Submit Button;
const Submit = document.querySelector('#Submit');
// target feedBack option;
const feedBack = document.querySelector('#feedback');

const randomTrack = [];

let Score = 0;

function generateInput(inputOptions) {
  const input = document.createElement('input');
  Object.keys(inputOptions).forEach((eachKey) => {
    input[eachKey] = inputOptions[eachKey];
  });
  return input;
}

function generateLabel(labelOptions) {
  const label = document.createElement('label');
  Object.keys(labelOptions).forEach((eachKey) => {
    label[eachKey] = labelOptions[eachKey];
  });
  return label;
}

function generateMCQs(currentQuestion) {
  const ul = document.createElement('ul');
  for (let i = 0; i <= 3; i++) {
    const li = document.createElement('li');
    const inputOptions = {
      type: 'radio',
      class: 'answer',
      id: `ans${i + 1}`,
      name: 'quiz-ques',
      value: currentQuestion.options[i],
    };
    const input = generateInput(inputOptions);

    const labelOptions = {
      for: `ans${i + 1}`,
      id: `option${i + 1}`,
    };
    const label = generateLabel(labelOptions);
    label.innerText = currentQuestion.options[i];
    li.append(`${String.fromCharCode(65 + i)}.`, input, label);
    ul.append(li);
  }
  return ul;
}


function generateRandomNumber(limit) {
  const randomNumber = Math.random() * limit;
  return Math.floor(randomNumber);
}

function getRandomNumber() {
  let randomNumber = generateRandomNumber(quizDB.length);
  const isNumberExist = randomTrack.includes(randomNumber);
  if (isNumberExist) {
    while (true) {
      randomNumber = generateRandomNumber(quizDB.length);
      const isNumberExist = randomTrack.includes(randomNumber);
      if (!isNumberExist) {
        randomTrack.push(randomNumber);
        return randomNumber;
      }
      if (randomTrack.length >= quizDB.length) {
        return;
      }
    }
  }
  randomTrack.push(randomNumber);
  return randomNumber;
}

// ---- Change Options and Start Timer ------
const loadQuestion = (currentQuiz) => {
  // target Question field;
  const title = document.querySelector('#title');
  title.innerText = `${randomTrack.length}. ${currentQuiz.Q}`;
  // load questions and options
  const currentQues = generateMCQs(currentQuiz);
  allInput.append(currentQues);
};

function checkForAns() {
  const targetNodes = allInput.firstChild.children;
  for(let i = 0; i < targetNodes.length; i++) {
    const currentChild = targetNodes[i].children[0];
    if(currentChild.checked) {
      return currentChild.value
    }
  }
  return null;
}

// check whose input user was select;
questionForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const userAnswer = checkForAns();
  if(userAnswer === null) {
    alert('Select Your Answer First');
    return
  }
  const currentQuestion = randomTrack.at(-1);
  console.log(userAnswer, quizDB[currentQuestion].ans)

  if (userAnswer === quizDB[currentQuestion].ans) {
    Score++;
  }

  // ----- Load next Question -----
  allInput.innerHTML = '';
  console.log(randomTrack)
  if (randomTrack.length < quizDB.length) {
    const currentRandomIndex = getRandomNumber();
    loadQuestion(quizDB[currentRandomIndex]);
  } else {
    showQuizResult();
  }
});

// feedBack prompt
feedBack.addEventListener('click', (homePage) => {
  homePage.preventDefault();

  const userThouht = prompt('Please Give Your Thoughts');
  if (!!userThouht) {
    console.log(userThouht);
    alert('Thank You For Your Attention');
  }
});

// function to show quiz result
const showQuizResult = () => {
  // Show Score which is user was select;
  showScore.innerHTML = `<h3>You Scored ${Score} / ${quizDB.length}</h3>
    <button class='btn' onclick='location.reload()'> Play Again </button>`;
  showScore.style.display = 'block';
  // hide the submit button
  Submit.style.display = 'none';
};

// Open True-False Quiz File
function categoryChange() {
  const selectedCategory = document.getElementById('categories').value;
  if (selectedCategory === 'True-False') {
    window.location.href = '../html/true-false.html';
  }
  // open Math.html
  if (selectedCategory === 'Math') {
    window.location.href = '../html/Math.html';
  }
}


loadQuestion(quizDB[getRandomNumber()]);