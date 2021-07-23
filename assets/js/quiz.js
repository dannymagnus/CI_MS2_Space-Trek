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

// Function to remove and add start and question box //
function startQuiz(){
console.log("quiz-started");
beginButton.classList.add('hidden');
quesContainer.classList.remove('hidden');
}


