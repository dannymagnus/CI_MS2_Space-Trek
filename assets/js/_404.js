// For navbar toggle//
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

/** 
* Event listener with function to toggle responsive navbar burger icon
*/
toggleButton.addEventListener('click', () => {
  "use strict";
  navbarLinks.classList.toggle('active');
});