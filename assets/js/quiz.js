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
shootButton.addEventListener('click', incrementQuestion);
let quesContainer = document.getElementById('ques-container');
let questionElement = document.getElementById('question');
let answersHTMLElement = document.getElementById('answers');
let quizWelcome= document.getElementById('quiz-welcome');
let scoresWrapper = document.getElementById('scores-wrapper');
//Used for 
let quizOuter = document.querySelector('#quiz-outer');
// Used for chooseAnswer function
let selectedButton;
// Variable assignment for chooseAnswer to check if correct answer selected
let correct;
let enemyShields;
let yourShields;
//Variable to change color of your shield blob
let yourShieldPercentContainer = document.getElementById('your-ship')
//Variable assignment for your shield percentage
let yourShieldPercent = document.querySelector('#your-shield');
//Variable to change color of enemy shield blob
let enemyShieldPercentContainer = document.getElementById('enemy-ship');
//Variable for enemy shield percentage
let enemyShieldPercent = document.querySelector('#enemy-shield');

// Declare  variables to be used for random question generation in function//
let shuffledQuestions = new Array;
let currentQuestionIndex;

// Function to remove and add start and question box //

function incrementQuestion(){
  currentQuestionIndex ++;
  nextQuestion()};


function startQuiz(){
  console.log("quiz-started");
  beginButton.classList.add('hidden');
  quizWelcome.classList.add('hidden');
  scoresWrapper.classList.remove('hidden');
  scoresWrapper.classList.add('scores-wrapper');
  quesContainer.classList.remove('hidden');
  yourShieldPercentContainer.className = 'shields-result';
  enemyShieldPercentContainer.className = 'shields-result';
  shuffle();
  console.log(shuffledQuestions[0].answer[0].option)
  currentQuestionIndex = 0;
  nextQuestion();
  console.log('next question called');
  yourShields = 100;
  enemyShields = 100;
  yourShieldPercent.innerText = yourShields;
  enemyShieldPercent.innerText = enemyShields;
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
  quizOuter.classList.remove('correct');
  quizOuter.classList.remove('incorrect');
  shootButton.classList.add('hidden');
  answersHTMLElement.innerHTML = '';
}

function chooseAnswer(event){
    selectedButton = event.target;
    correct = selectedButton.dataset.correct;
    if (correct){
      enemyShields -= 20
    }else{yourShields -= 20};
    setStatusClass(quizOuter, correct);
    Array.from(answersHTMLElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
    changeYourShieldColor();
    changeEnemyShieldColor();
    if (yourShields <= 0 ){
      alert('Your ship was destroyed');
      beginButton.classList.remove('hidden')
      beginButton.innerText = 'Play again'
    }
    else if(enemyShields <= 0){
      alert('You destroyed Khan and saved the federation!')
      beginButton.classList.remove('hidden')
      beginButton.innerText = 'Play again';
      /*
      quizWelcome.innerHTML = `
      <video width="320" height="240">
      <source src="../assets/video/khan-last-breath.webm" type="video/webm">
      Your browser does not support the video tag.
      </video> 
      `
      quizWelcome.classList.remove('hidden');*/
    }
    else{shootButton.classList.remove('hidden')}
    yourShieldPercent.innerText = yourShields;
    enemyShieldPercent.innerText = enemyShields;
};

function changeYourShieldColor(){
  switch(yourShields){
    case 80:
      yourShieldPercentContainer.classList.add('eighty');
      break;
    case 60:
      yourShieldPercentContainer.classList.add('sixty');
      break;
    case 40:
      yourShieldPercentContainer.classList.add('fourty');
       break;
    case 20:
      yourShieldPercentContainer.classList.add('twenty');
      break;
    case 0:
      yourShieldPercentContainer.classList.add('incorrect');
      break;
  }
}

function changeEnemyShieldColor(){
  switch(enemyShields){
    case 80:
      enemyShieldPercentContainer.classList.add('eighty');
      break;
    case 60:
      enemyShieldPercentContainer.classList.add('sixty');
      break;
    case 40:
      enemyShieldPercentContainer.classList.add('fourty');
       break;
    case 20:
      enemyShieldPercentContainer.classList.add('twenty');
      break;
    case 0:
      enemyShieldPercentContainer.classList.add('incorrect');
      break;
  }
}

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
  let cloneQuestions = Array.from(questions);
  console.log('cloneQuestions is ' + cloneQuestions.length);
  console.log(cloneQuestions);

  for (let i=0; i < cloneQuestions.length ; i++){
      let randomIndex = Math.floor(Math.random() * cloneQuestions.length);
      shuffledQuestions[i] = cloneQuestions[randomIndex];
      cloneQuestions.splice(randomIndex,1);
  }
}

//Question Bank

let questions = [
  {question: 'What was the name of the computer simulation beaten by James T. Kirk?',
  answer:[
  {option:'Kobiyashi Maru', correct:true},
  {option:'Kobiyashi Teng', correct:false},
  {option:'Warbird Krath', correct:false},
  {option:'Warbird Warf', correct:false}]},
  {question: 'Which of the following are not part of the Enterprise crew',
  answer:[
  {option:'Enson Crusher', correct:false},
  {option:'Leuitenent Warf', correct:false},
  {option:'Seven of Nine', correct:true},
  {option:'Dr McCoy', correct:false}]},
  {question: 'Which drink is commonly associated with Captain Jean Luc Picard?',
  answer:[
  {option:'Earl Gray Tea', correct:true},
  {option:'Darjeeling Tea', correct:false},
  {option:'Black Coffee', correct:false},
  {option:'Cognac', correct:false}]},
  {question: 'Which star is nearest to the sun?',
  answer:[
  {option:'Sol', correct:false},
  {option:'Alpha Centauri', correct:true},
  {option:'Wolf 359', correct:false},
  {option:'Barnards Star', correct:false}]},
  {question: 'How many light years is Tau Ceti from the Earth',
  answer:[
  {option:'11.89', correct:true},
  {option:'11.99', correct:false},
  {option:'9.99', correct:false},
  {option:'15.99', correct:false}]},
  {question: 'For what does the T in James T. Kirk stand?',
  answer:[
  {option:'Trevor', correct:false},
  {option:'Titan', correct:false},
  {option:'Titherium', correct:false},
  {option:'Tiberius', correct:true}]},
  {question: 'The moon called Titan orbits which planet?',
  answer:[
  {option:'Mars', correct:false},
  {option:'Saturn', correct:true},
  {option:'Uranus', correct:false},
  {option:'Jupiter', correct:false}]},
  {question: 'What is the name of the Enterprise Chief Engineer?',
  answer:[
  {option:'James Scott', correct:false},
  {option:'Montgommery Scott', correct:true},
  {option:'James Angus Scott', correct:false},
  {option:'Scott Montgommery', correct:false}]},
  {question: "On what planet did James Kirk 'abandon' Khan? ",
  answer:[
  {option:'Ceti Alpha III', correct:false},
  {option:'Ceti Alpha IV', correct:false},
  {option:'Ceti Alpha V', correct:true},
  {option:'Ceti Alpha VI', correct:false}]},
  {question: 'What was the name of the device that Khan steals from Space Station Regula 1',
  answer:[
  {option:'Doomsday', correct:false},
  {option:'Genenis', correct:true},
  {option:'Armegedon', correct:false},
  {option:'Apocalypse', correct:false}]},
  {question: 'The Romulans are species related to.....',
  answer:[
  {option:'Vulcans', correct:true},
  {option:'Klingons', correct:false},
  {option:'Terrans', correct:false},
  {option:'Rasians', correct:false}]},
  {question: 'What is the nucleus of a comet made from?',
  answer:[
  {option:'hellium and water', correct:false},
  {option:'fire', correct:false},
  {option:'radio waves', correct:false},
  {option:'ice, dust, and organic materials', correct:true}]},
  {question: 'What is distant source of radio waves noticed by astronomers?',
  answer:[
  {option:'Phasers', correct:false},
  {option:'Leptons', correct:false},
  {option:'Quasars', correct:true},
  {option:'Rayons', correct:false}]},
  {question: 'When did the space age begin?',
  answer:[
  {option:'1957', correct:true},
  {option:'1969', correct:false},
  {option:'1941', correct:false},
  {option:'1999', correct:false}]},
  {question: 'On which space craft was Laika, the first living being sent into space?',
  answer:[
  {option:'Vostok 1', correct:false},
  {option:'Sputnik 2', correct:true},
  {option:'Apollo 11', correct:false},
  {option:'Sputnik 3', correct:false}]},
  {question: 'The atmosphere on Mars is mostly comprised of..',
  answer:[
  {option:'Nitrogen', correct:false},
  {option:'Carbon Dioxide', correct:true},
  {option:'Helium', correct:false},
  {option:'Argon', correct:false}]},
  {question: 'The name of Mr Spock\'s firs commanding officer was Captian...',
  answer:[
  {option:'Rogers', correct:false},
  {option:'Sisco', correct:false},
  {option:'Peters', correct:false},
  {option:'Pike', correct:true}]},
  {question: 'Which of the Enterprise crew were subject to Khan\'s mind control?',
  answer:[
  {option:'Chekov', correct:true},
  {option:'Uhura', correct:false},
  {option:'Spock', correct:false},
  {option:'McCoy', correct:false}]}
];