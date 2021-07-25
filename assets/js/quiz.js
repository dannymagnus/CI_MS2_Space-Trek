// For navbar toggle//
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})


//Variable declarations for quiz page //

let beginButton = document.getElementById('begin-btn');
beginButton.addEventListener('click', startQuiz);
let shootButton = document.querySelector('#shoot-btn')
let quesContainer = document.getElementById('ques-container');
let questionElement = document.getElementById('question');
let answersHTMLElement = document.getElementById('answers');
//Used for 
let quizOuter = document.querySelector('#quiz-outer');
// Used for chooseAnswer function
let selectedButton;
// Variable assignment for chooseAnswer to check if correct answer selected
let correct

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
  clearState();
  console.log(' function call recieved');
  revealQuestion(shuffledQuestions[currentQuestionIndex]);
  console.log(shuffledQuestions[currentQuestionIndex].question)
}

function revealQuestion(question){
  console.log(question.question + "this is reveal question call");
  questionElement.innerText = question.question;
  for (let i = 0; i < question.answer.length; i++) {
    console.log(question.answer[i]);
    var button = document.createElement('button');
    button.innerText = question.answer[i].option;
    button.classList.add('btn-quiz', 'btn');
    button.addEventListener('click', chooseAnswer);
    if(question.answer[i].correct === true){
      button.dataset.correct = question.answer[i].correct;
    }
    answersHTMLElement.appendChild(button);
  }
  console.log(answersHTMLElement);
}

function clearState(){
  shootButton.classList.add('hidden');
  answersHTMLElement.innerHTML = '';
}

function chooseAnswer(event){
    selectedButton = event.target;
    correct = selectedButton.dataset.correct;
    console.log(correct);
    setStatusClass(quizOuter, correct);
    Array.from(answersHTMLElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
};

//
//
function setStatusClass(element,correct) {
  element.classList.remove('correct');
  element.classList.remove('incorrect');
  if (correct){
    element.classList.add('correct');
  }else{
    element.classList.add('incorrect');
  }
}


//
//

// Function to create buttons for answers //



//Question Randomiser //

function shuffle() {
  let cloneQuestions = JSON.parse(JSON.stringify(questions));

  for (let i=0; i < cloneQuestions.length ; i++){
      let randomIndex = Math.floor(Math.random() * cloneQuestions.length);
      shuffledQuestions[i] = cloneQuestions[randomIndex];
      cloneQuestions.splice(randomIndex,1);
  }
}