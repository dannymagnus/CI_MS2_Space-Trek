// For navbar toggle//
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

//Toggle for main nav bar
toggleButton.addEventListener('click', () => {
    "use strict";
    navbarLinks.classList.toggle('active');
  });