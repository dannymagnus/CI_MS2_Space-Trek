// For navbar toggle//
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

//Variable declarations for quiz page //
// Variable to grab quiz form
let quizRegister = document.getElementById('quiz-register');
// Variable to handle form submission
let quizForm = document.getElementById('quiz-form');
quizForm.addEventListener('submit', registerUserShip);
// To grab name input element for quiz page 
let nameInput = document.getElementById('name-input');
// To grab ship input element for quiz page 
let shipInput = document.getElementById('ship-input');
// To grab button on ship register
let registerShipButton = document.getElementById('register-ship');
registerShipButton.addEventListener('click', registerUserShip);
// To grab whole text and question area
let quizContainer = document.getElementById('quiz-container');
// To grab start button
let beginButton = document.getElementById('begin-btn');
beginButton.addEventListener('click', startQuiz);
// To grab next button
let shootButton = document.querySelector('#shoot-btn')
shootButton.addEventListener('click', incrementQuestion);
// To grab question area only - used to hide on game end
let quesContainer = document.getElementById('ques-container');
// To grab question only used when setting next question
let questionElement = document.getElementById('question');
// To grab answers grid element - to be used to create next questions
let answersHTMLElement = document.getElementById('answers');
// To grab welcome and intro only to hide on start
let quizWelcome= document.getElementById('quiz-welcome');
//To grab scores and hide during intro
let scoresWrapper = document.getElementById('scores-wrapper');
//Used for 
let quizOuter = document.querySelector('#quiz-outer');
// Used for chooseAnswer function
let selectedButton;
// Variable assignment for chooseAnswer to check if correct answer selected
let correct;
// Variable to change shield percentages
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
//Variable taken from user form submission
// Variables declared to be assigned on user input
let userName;
let shipName;
let ships = Array.from(document.querySelectorAll('.ship-container'));

// Declare  variables to be used for random question generation in function//
let shuffledQuestions = new Array;
let currentQuestionIndex;

// Function to remove and add start and question box //

function incrementQuestion(){
  currentQuestionIndex ++;
  nextQuestion()};

  function registerUserShip(event){
    event.preventDefault();
    console.log('register ship called');
    userName = document.querySelector('#name-input').value;
    shipName = document.querySelector('#ship-input').value;
    console.log(userName, shipName);
    quizWelcome.innerHTML = `
    <p>
    Welcome <strong>${userName}</strong>. You are now appointed as the captain of the <strong>USS ${shipName}</strong>
    </p>
    <p>
    Khan <span class="sm">Noonien Singh</span> has escaped <span class="sm">from the planet you imprisoned him on</span> and is now ready to avenge
    himself upon you!
    </p>
    <p>
    He has challenged you to a battle of intellect on all things space and Star - Trek
    </p>
    <p>
    The rules? Simple.  For each correct answer, you damage his ship, for each incorrect, yours takes damage.
    </p>
    `;
    quizRegister.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    ships[0].classList.remove('hidden');
    scoresWrapper.firstElementChild.firstElementChild.innerText = "USS " + shipName;
  }  

function startQuiz(){
  $ ( "#enemy-ship-img" ).fadeIn(1);
  $ ( "#your-ship-img" ).fadeIn(1);
  ships[1].classList.remove('hidden');
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
      beginButton.classList.remove('hidden')
      beginButton.innerText = 'Play again'
      quizWelcome.innerHTML = `
      <p>You are defeated.. ${userName}!</p>
      <p>Your legacy will be a mere whisper through space, as your adversary tosses your bones across the cosmos.</p>
      `
      quizWelcome.classList.remove('hidden');
      quesContainer.classList.add('hidden');
      $ ( "#your-ship-img" ).fadeOut(1000);
    }
    else if(enemyShields <= 0){
      beginButton.classList.remove('hidden')
      beginButton.innerText = 'Play again';
      quizWelcome.innerHTML = `
      <p>Congratulations ${userName}!</p>
      <p>You have successfully dispatched your enemy and rid the universe of this no good space filth!</p>
      `
      quizWelcome.classList.remove('hidden');
      quesContainer.classList.add('hidden');
      $ ( "#enemy-ship-img" ).fadeOut(1000);
    }
    else{shootButton.classList.remove('hidden')}
    yourShieldPercent.innerText = yourShields;
    enemyShieldPercent.innerText = enemyShields;
};
//Function to switch shields color (you)
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


//Function to switch shields color (enemy)
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


//To add launch button for own modal
const contactLaunch = document.querySelector('#contact-launch');
//To add listener for own modal
const contactFormOuter = document.querySelector('#contact-form-outer');
//To grab main divs for sucess message fade in and out
const mainContent = document.getElementById('main-content');
// Grab to add and remove function created child
const mainContainer = document.getElementById('main-container');
//To use variable with Jquery to hide and reveal main content
const mainContentId = mainContent.getAttribute('id');


//Toggle to reveal self made modal
contactLaunch.addEventListener('click', () => {
  $("#contact-form-outer").fadeIn(1000);
  contactFormOuter.style.display = 'flex';
})

//for contact form button and use mailjs API
window.onload = function () {
  document.getElementById('contact-form').addEventListener('submit', function (event) {
    // prevent default action
    event.preventDefault();
    emailjs.init("user_mrJgfpy8vz9l8LqeGGrjA");
    // these IDs from the previous steps
    emailjs.sendForm('service_y7rgdam', 'dans_template', this)
      .then(function () {
        console.log('SUCCESS!');
      }, function (error) {
        console.log('FAILED...', error);
      });
    //On complete fade out modal
    $("#contact-form-outer").fadeOut(1000);
    //Call function display success message pass variables from grab at page top
    createSuccessMessage(mainContainer, mainContent);
    //Function to create success message and append to body
    function createSuccessMessage(outer, inner) {
      var contactSuccessElement = document.createElement('div');
      contactSuccessElement.setAttribute('id', 'contact-success');
      contactSuccessElement.style.cssText = "display:none; border: 1px solid darkblue; background-color: rgba(var(--hue-neutral),.5); padding:30px; border-radius:30px; text-align:center;"
      var contactSuccessHTML =
        `
  <div>
          <h2>Reply from Space Fleet</h2>
          <p>...message recieved.  We'll get right on it.  Stay your course Captain.</p>
          <button id = "ack-btn" class = "btn contact-btn ack">Ok</button>
  </div>
  `;
      contactSuccessElement.innerHTML = contactSuccessHTML;
      outer.appendChild(contactSuccessElement);
      inner.style.display = 'none';
      setTimeout(function () {
        $('#contact-success').fadeIn(1000);
        //your code to be executed after 1 second
      }, 1000);
      // Add event listener to acknowledge button to fade and remove div and return previous
      const ackBtn = document.querySelector('#ack-btn');
      ackBtn.addEventListener('click', () => {
        $('#contact-success').fadeOut(1000);
        const contactSuccessElement = document.querySelector('#contact-success');
        setTimeout(function () {
          mainContainer.removeChild(contactSuccessElement);
          $('#' + mainContentId).fadeIn(1000);
        }, 1000);
      });
    }
  });
}