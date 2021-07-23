// For navbar toggle//
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})


//Variable declarations for quiz page //

let beginButton = document.getElementById('begin-btn');
beginButton.addEventListener('click', startQuiz);
let quesContainer = document.getElementById('ques-container');
let questionElement = document.getElementById('question');
let answers = document.getElementById('answers');

// Declare  variables to be used for random question generation in function//
let shuffledQuestions = new Array;
let currentQuestionIndex;

let questions = [
  {question: 'What was the name of the computer simulation beaten by James T. Kirk?',
  answer:[
  {option:'Kobiyashi Maru', correct:true},
  {option:'Kobiyashi Teng', correct:false},
  {option:'Warbird Krath', correct:false},
  {option:'Warbird Warf', correct:false}]}
];

// Function to remove and add start and question box //

function startQuiz(){
  console.log("quiz-started");
  beginButton.classList.add('hidden');
  quesContainer.classList.remove('hidden');
  shuffle();
  console.log(shuffledQuestions[0].answer[0].option)
  currentQuestionIndex = 0;
  nextQuestion();
  console.log('next question called');
}

function nextQuestion(){
  console.log('call recieved');
  revealQuestion(shuffledQuestions[currentQuestionIndex]);
  console.log(shuffledQuestions[currentQuestionIndex].question)
}

function revealQuestion(question){
  console.log(question.question + "this is reveal question call");
  questionElement.innerText = question.question;
}
//Question Randomiser //

function shuffle() {
  let cloneQuestions = JSON.parse(JSON.stringify(questions));

  for (let i=0; i < cloneQuestions.length ; i++){
      let randomIndex = Math.floor(Math.random() * cloneQuestions.length);
      shuffledQuestions[i] = cloneQuestions[randomIndex];
      cloneQuestions.splice(randomIndex,1);
  }
}