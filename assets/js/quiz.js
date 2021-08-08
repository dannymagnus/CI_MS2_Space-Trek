// For navbar toggle//
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

//Event listener for nav bar toggle
toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
});

//Variable declarations for quiz page //
// Variable to grab quiz form
let quizRegister = document.getElementById('quiz-register');
// Variable to handle form submission
let quizForm = document.getElementById('quiz-form');
quizForm.addEventListener('submit', registerUserShip);
// To grab name input element for quiz page 
let registerShipButton = document.getElementById('register-ship');
registerShipButton.addEventListener('click', registerUserShip);
// To grab whole text and question area
let quizContainer = document.getElementById('quiz-container');
// To grab start button
let beginButton = document.getElementById('begin-btn');
beginButton.addEventListener('click', startQuiz);
// To grab next button
let shootButton = document.querySelector('#shoot-btn');
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
let yourShieldPercentContainer = document.getElementById('your-ship');
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
let shuffledQuestions = [];
let currentQuestionIndex;

// Function to increment question
function incrementQuestion(){
  currentQuestionIndex ++;
  nextQuestion();
}

//Function to take user details and feeback in HTML
  function registerUserShip(event){
    //prevent default event
    event.preventDefault();
    let namefield = document.forms["quiz-form"]["name-input"].value;
    let shipfield = document.forms["quiz-form"]["ship-input"].value;
    if (namefield == "" || shipfield == "") {
    alert("All fields must be filled out");
    return false;}
    //fades contact form button as modal impacts game layout
    $('#contact-launch').fadeOut(1000);
    //Grab user input for name and ship name
    userName = document.querySelector('#name-input').value;
    shipName = document.querySelector('#ship-input').value;
    //HTML literal for welcome message
    quizWelcome.innerHTML = `
    <p>
      Welcome <strong>${userName}</strong>, captain of the <strong>USS ${shipName}</strong>
    </p>
    <p>
      An alien spacecraft has entered alied space and are staking a claim on our solar system.
    </p>
    <p>
      To prove thier supremacy they have challenged you to a battle of intellect on all things space.
    </p>
    <p>
      The rules? Simple.  For each correct answer, you damage his ship, for each incorrect, yours takes damage.
    </p>
    `;
    //Hide quiz register and show quiz container
    quizRegister.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    //Show user ship image
    ships[0].classList.remove('hidden');
    scoresWrapper.firstElementChild.firstElementChild.innerText = "USS " + shipName;
  }  

//Quiz start on button press
function startQuiz(){
  //Display both ship containers
  $ ( "#enemy-ship-img" ).fadeIn(1);
  $ ( "#your-ship-img" ).fadeIn(1);
  ships[1].classList.remove('hidden');
  //hide start button
  beginButton.classList.add('hidden');
  //hide welcome div
  quizWelcome.classList.add('hidden');
  //show scores wrapper
  scoresWrapper.classList.remove('hidden');
  scoresWrapper.classList.add('scores-wrapper');
  //show question container
  quesContainer.classList.remove('hidden');
  //add class of shiel-result to shield container
  yourShieldPercentContainer.className = 'shields-result';
  enemyShieldPercentContainer.className = 'shields-result';
  //Call shuffle function
  shuffle();
  //Set current question index
  currentQuestionIndex = 0;
  //Call next question function
  nextQuestion();
  //set shields values
  yourShields = 100;
  enemyShields = 100;
  //set values for shields for use in case later
  yourShieldPercent.innerText = yourShields;
  enemyShieldPercent.innerText = enemyShields;
}

function nextQuestion(){
  //clear all for quesion set
  clearState();
  //call reveal function
  revealQuestion(shuffledQuestions[currentQuestionIndex]);
}

//function to reveal next question
function revealQuestion(question){
  //Takes question value from the object
  questionElement.innerText = question.question;
  for (let i = 0; i < question.answer.length; i++) {
    //For each answer in the object, create a button
    var button = document.createElement('button');
    // Set button text as the answer text
    button.innerText = question.answer[i].option;
    // Add syling classes to the buttons
    button.classList.add('btn-quiz', 'btn');
    // Add listeners with the chooseAnswer function
    button.addEventListener('click', chooseAnswer);
    //Add dataset item on element that has true (data set used and dont want to change boolean values)
    if(question.answer[i].correct === true){
      button.dataset.correct = question.answer[i].correct;
    }
    //Apend each buttons to anwers element
    answersHTMLElement.appendChild(button);
  }
}

//Function to reset question/answer space
function clearState(){
  //Reset background to neutral
  quizOuter.classList.remove('correct');
  quizOuter.classList.remove('incorrect');
  //Reveal the next question button
  shootButton.classList.add('hidden');
  //Clear the content from the answers element
  answersHTMLElement.innerHTML = '';
}

//Event listener function from select answer
function chooseAnswer(event){
    //Captures users selection
    selectedButton = event.target;
    //Compares user selection to true value stored in dataset and capture as boolean
    correct = selectedButton.dataset.correct;
    //If statement to reduce shields
    if (correct){
      enemyShields -= 20;
    }else{yourShields -= 20;
    }
    //Function to set color of outer background
    setStatusClass(quizOuter, correct);
    //Function to set color of buttons
    Array.from(answersHTMLElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    });
    //Function to set color of you shield bubble
    changeYourShieldColor();
    //Function to set color of enemy shield bubble
    changeEnemyShieldColor();
    //If statement if your shields are 0 - game over
    if (yourShields <= 0 ){
      beginButton.classList.remove('hidden');
      beginButton.innerText = 'Play again';
      quizWelcome.innerHTML = `
      <p>You are defeated.. ${userName}!</p>
      <p>Your legacy will be a mere whisper through space, as your adversary tosses your bones across the cosmos.</p>
      `;
      quizWelcome.classList.remove('hidden');
      quesContainer.classList.add('hidden');
      $ ( "#your-ship-img" ).fadeOut(1000);
    }
    //if enemy shields are 0 - you win
    else if(enemyShields <= 0){
      beginButton.classList.remove('hidden');
      beginButton.innerText = 'Play again';
      quizWelcome.innerHTML = `
      <p>Congratulations ${userName}!</p>
      <p>You have successfully dispatched your enemy and rid the universe of this no good space filth!</p>
      `;
      quizWelcome.classList.remove('hidden');
      quesContainer.classList.add('hidden');
      $ ( "#enemy-ship-img" ).fadeOut(1000);
    }
    //game continue if shields !==0
    else{shootButton.classList.remove('hidden');
  }
    yourShieldPercent.innerText = yourShields;
    enemyShieldPercent.innerText = enemyShields;
}
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

// Function to add css classes and change color of background and buttons
function setStatusClass(element,correct) {
  element.classList.remove('correct');
  element.classList.remove('incorrect');
  if (correct){
    element.classList.add('correct');
  }else{
    element.classList.add('incorrect');
  }
}

//Question Randomiser //

function shuffle() {
  let cloneQuestions = Array.from(questions);

  for (let i=0; i < cloneQuestions.length ; i++){
      let randomIndex = Math.floor(Math.random() * cloneQuestions.length);
      shuffledQuestions[i] = cloneQuestions[randomIndex];
      cloneQuestions.splice(randomIndex,1);
  }
}

//Question Bank

let questions = [
  {question: 'How many miles approximately is the earth from the sun?',
  answer:[
  {option:'93 millon', correct:true},
  {option:'93 billion', correct:false},
  {option:'83 million', correct:false},
  {option:'75 billion', correct:false}]},
  {question: 'What type of star is the sun?',
  answer:[
  {option:'White Dwarf', correct:false},
  {option:'Red Giant', correct:false},
  {option:'Yellow Dwarf', correct:true},
  {option:'Neutron Star', correct:false}]},
  {question: 'What is the hottest planet in our solar system?',
  answer:[
  {option:'Venus', correct:true},
  {option:'Mercury', correct:false},
  {option:'Earth', correct:false},
  {option:'Jupiter', correct:false}]},
  {question: 'How many planets are named after greek gods?',
  answer:[
  {option:'5', correct:false},
  {option:'7', correct:true},
  {option:'8', correct:false},
  {option:'6', correct:false}]},
  {question: 'How many light years is Tau Ceti from the Earth',
  answer:[
  {option:'11.89', correct:true},
  {option:'11.99', correct:false},
  {option:'9.99', correct:false},
  {option:'15.99', correct:false}]},
  {question: 'Of what is the planet Saturn mostly comprised?',
  answer:[
  {option:'Hydrogen and Helium', correct:true},
  {option:'Carbon Dioxide', correct:false},
  {option:'Helium and Argon', correct:false},
  {option:'Hydrogen and Nitrogen', correct:false}]},
  {question: 'The moon called Titan orbits which planet?',
  answer:[
  {option:'Mars', correct:false},
  {option:'Saturn', correct:true},
  {option:'Uranus', correct:false},
  {option:'Jupiter', correct:false}]},
  {question: 'In what year was Neptune discovered?',
  answer:[
  {option:'1926', correct:false},
  {option:'1846', correct:true},
  {option:'1957', correct:false},
  {option:'1969', correct:false}]},
  {question: "Which planet spins on it's side axis relative to earth's",
  answer:[
  {option:'Venus', correct:false},
  {option:'Saturn', correct:false},
  {option:'Uranus', correct:true},
  {option:'Neptune', correct:false}]},
  {question: 'What planet is the most recent to have had probes land on it\'s surface?',
  answer:[
  {option:'Venus', correct:false},
  {option:'Mars', correct:true},
  {option:'Jupiter', correct:false},
  {option:'Mercury', correct:false}]},
  {question: 'On what planet do scientist\s believe volcano\'s may still be active?',
  answer:[
  {option:'Venus', correct:true},
  {option:'Mars', correct:false},
  {option:'Mercury', correct:false},
  {option:'Uranus', correct:false}]},
  {question: 'What is the nucleus of a comet made from?',
  answer:[
  {option:'hellium and water', correct:false},
  {option:'fire', correct:false},
  {option:'radio waves', correct:false},
  {option:'ice, dust, and organic materials', correct:true}]},
  {question: 'What is a distant source of radio waves noticed by astronomers called?',
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
  {question: 'The moon\'s inner core is made of...',
  answer:[
  {option:'Solid Lead', correct:false},
  {option:'Molten Silicate', correct:false},
  {option:'Liquid Iron', correct:false},
  {option:'Solid Iron', correct:true}]},
  {question: 'How many major moons does Uranus have?',
  answer:[
  {option:'5', correct:true},
  {option:'6', correct:false},
  {option:'27', correct:false},
  {option:'9', correct:false}]}
];


//To add launch button for own modal
const contactLaunch = document.querySelector('#contact-launch');
//To add listener for own modal
const contactFormOuter = document.querySelector('#contact-form-outer');
//To grab main divs for sucess message fade in and out
const mainContent = document.getElementById('quiz-register');
// Grab to add and remove function created child
const mainContainer = document.getElementById('quiz-outer');
//To use variable with Jquery to hide and reveal main content
const mainContentId = mainContent.getAttribute('id');


//Toggle to reveal self made modal
contactLaunch.addEventListener('click', () => {
  $("#contact-form-outer").fadeIn(1000);
  contactFormOuter.style.display = 'flex';
});

//for contact form button and use mailjs API
window.onload = function () {
  document.getElementById('contact-form').addEventListener('submit', function (event) {
    // prevent default action
    event.preventDefault();
    //Form validation to prevent empty field submission
    let name = document.forms["contact-form"]["contact-name"].value;
    let email = document.forms["contact-form"]["contact-email"].value;
    let message = document.forms["contact-form"]["contact-message"].value;
    if (name == "" || email == "" || message == "") {
    alert("All fields must be filled out");
    return false;}
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
      contactSuccessElement.style.cssText = "display:none; border: 1px solid darkblue; background-color: rgba(var(--hue-neutral),.5); padding:30px; border-radius:30px; text-align:center;";
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
};