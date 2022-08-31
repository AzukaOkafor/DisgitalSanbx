const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const welcomeElement = document.getElementById('welcome')
const resultForm = document.getElementById("form-result");
const startImage = document.getElementById("start-image");
const wrong = new Audio('./sounds/incorrect.mp3');
wrong.loop = false;
const right = new Audio('./sounds/correct.mp3');
right.loop = false;

let countRightAnswers = 0;
let shuffledQuestions, currentQuestionIndex
let currentQuestion = 1;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  welcomeElement.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()

  currentQuestion = 1;
document.getElementById("current-question").innerHTML = currentQuestion;

//  resets the counter if the quiz restarts
countRightAnswers = 0;

document.getElementById("all-questions2").innerHTML = questions.length;
document.getElementById("all-questions").innerHTML = questions.length;
}

// for images within the quiz
function hideImage() {
  startImage.classList.add("hide");
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    // to add images to answers
if (answer.isImage) {
  button.classList.add('image-question')
  answerButtonsElement.classList.add('image-wrapper');
} else {
  answerButtonsElement.classList.remove('image-wrapper');
}

button.style.backgroundImage = answer.image;
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    resultForm.classList.remove("hide");
    questionContainerElement.classList.add("hide");
    startButton.innerText = 'Try again?'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

// // display the score
// document.getElementById("right-answers").innerHTML = countRightAnswers;
// document.getElementById("answers-percent").innerHTML = (
//   (100 * countRightAnswers) /
//   questions.length
// ).toFixed(0);

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What was the most common Mobile Operating System before 2007',
    answers: [
      { text: 'Apple iOS', correct: false },
      { text: 'BlackberryOS', correct: false },
      { text: 'Nokia Simbian', correct: true },
      { text: 'Android', correct: false }
    ]
  },
  {
    question: 'What was the first smartphone?',
    answers: [
      { text: 'Nokia 3310', correct: false },
      { text: 'Motorola Edge', correct: false },
      { text: 'Sony Ericsson Walkman', correct: false },
      { text: 'IBM Simon', correct: true }
    ]
  },
  {
    question: 'Which of these smartphone brands were most used by businesses before 2007?',
    answers: [
      { text: 'Samsung', correct: false },
      { text: 'Blackberry', correct: true },
      { text: 'Nokia', correct: false },
      { text: 'Motorola', correct: false }
    ]
  },
  {
    question: 'What was the most popular smartphone form factor before 2007?',
    answers: [
      { text: ' ', image: 'url("images/flip phone.jpg")', isImage: true, correct: false },
      { text: ' ', image: 'url("images/slate phone.jpg")', isImage: true, correct: false },
      { text: ' ', image: 'url("images/bar phone.jpg")', isImage: true, correct: true },
      { text: ' ', image: 'url("images/slider phone.jpg")', isImage: true, correct: false },
    ]
  },
  {
    question: 'When was the first iPhone released?',
    answers: [
      { text: '2006', correct: false },
      { text: '2010', correct: false },
      { text: '2007', correct: true  },
      { text: '2012', correct: false }
    ]
  },
  {
    question: 'What was the first smartphone with a capacitive touchscreen and no keyboard',
    answers: [
      { text: 'Apple iPhone', correct: false },
      { text: 'Motorola RAZR', correct: false },
      { text: 'LG Prada', correct: true },
      { text: 'Samsumg Galaxy', correct: false }
    ]
  },
  {
    question: 'What smartphone first launched with a Full HD screen in 2012',
    answers: [
      { text: 'Apple iPhone 3G', correct: false },
      { text: 'Sony Xperia', correct: false },
      { text: 'HTC Butterfly', correct: true },
      { text: 'Samsung Galaxy', correct: false }
    ]
  },
  {
    question: 'Which company released the first ever 4G smartphone?',
    answers: [
      { text: 'Sony', correct: false },
      { text: 'Samsung', correct: false },
      { text: 'Apple', correct: false },
      { text: 'HTC', correct: true }
    ]
  },
  {
    question: 'What was the first smartphone to launch with Wifi support',
    answers: [
      { text: 'Apple iPhone', correct: false },
      { text: 'Samsung Wave', correct: true },
      { text: 'Nokia N90', correct: false },
      { text: 'LG Chocolate', correct: false }
    ]
  },
  {
  question: "In 2018, which of these smartphones introduced the first pop-up camera?",
  answers: [
    { text: ' ', image: 'url("images/oppo findx.gif")', isImage: true, correct: false },
    { text: ' ', image: 'url("images/vivo nex.gif")', isImage: true, correct: true },
    { text: ' ', image: 'url("images/samsung.gif")', isImage: true, correct: false },
    { text: ' ', image: 'url("images/asus.gif")', isImage: true, correct: false },
  ]
},
{
question: "The first foldable phone was announced in 2018, which of these smartphones was it?",
answers: [
  { text: ' ', image: 'url("images/matex.gif")', isImage: true, correct: false },
  { text: ' ', image: 'url("images/razr.gif")', isImage: true, correct: false },
  { text: ' ', image: 'url("images/galaxyfold.gif")', isImage: true, correct: false },
  { text: ' ', image: 'url("images/royoleflex.gif")', isImage: true, correct: true },
]
},
  {
  question: 'In 2000, which of these companies brought the first camera phone to market',
  answers: [
    { text: 'Sanyo', correct: false },
    { text: 'Samsung', correct: false },
    { text: 'Toshiba', correct: false },
    { text: 'Sharp', correct: true }
  ]
  },
  {
    question: 'Which company first introduced a triple camera setup in a smartphone?',
    answers: [
      { text: 'HTC', correct: false },
      { text: 'Samsung', correct: false },
      { text: 'Sony', correct: false },
      { text: 'Huawei', correct: true }
    ]
  },
  {
    question: 'In 2022, what Smartphone Operating System is the most used in the world?',
    answers: [
      { text: 'Apple iOS', correct: false },
      { text: 'Microsoft Windows Phone', correct: false },
      { text: 'Android', correct: true },
      { text: 'BlackberryOS', correct: false }
    ]
  },
  {
    question: 'If Apple owns the iOS Operating System, which company owns the Android Operating System?',
    answers: [
      { text: 'Samsung', correct: false },
      { text: 'Google', correct: true },
      { text: 'Facebook', correct: false },
      { text: 'Amazon', correct: false }
    ]
  }
]
