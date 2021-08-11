// For navbar toggle//
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];
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
const modalClose = document.querySelector('#modal-close');


/**
 * Event listener with function to toggle responsive navbar burger icon
 */
toggleButton.addEventListener('click', () => {
  "use strict";
  navbarLinks.classList.toggle('active');
});

/**
 * Event listener with function to reveal self made modal of contact form
 */
contactLaunch.addEventListener('click', () => {
  "use strict";
  $("#contact-form-outer").fadeIn(1000);
  contactFormOuter.style.display = 'flex';
});

/**
 * Function to prevent default form submission and send completed form values to email credit www.mailjs.com
 */
window.onload = function () {
  document.getElementById('contact-form').addEventListener('submit', function (event) {
    // prevent default action
    event.preventDefault();
    //Form validation to prevent empty field submission
    let name = document.forms["contact-form"]["contact-name"].value;
    let email = document.forms["contact-form"]["contact-email"].value;
    let message = document.forms["contact-form"]["contact-message"].value;
    if (name == "" || email == "" || message == "") {
      /**
      Swal give alert box style modal with error message to user.  Credit https://sweetalert2.github.io/
      */
      Swal.fire({
        title: 'Please complete all fields',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        background: '#383838',
        confirmButtonColor: 'rgb(45,112,147)',
        color: 'white',
      });
      return false;
    }
    let vmail = validateEmail(email);
    if (vmail == false) {
      return false;
    }
    emailjs.init("user_mrJgfpy8vz9l8LqeGGrjA");
    emailjs.sendForm('service_y7rgdam', 'dans_template', this)
      .then(function () {}, function (error) {});
    //On complete fade out modal
    $("#contact-form-outer").fadeOut(1000);
    createSuccessMessage(mainContainer, mainContent);

    /**
     * Function to display success message
     * It creates a div element
     * It sets attributes and styles to the div element
     * It creates the inner HTML content and appends it to the DOM
     * It hides the inner body of the existing content then fades in the new div
     * @param {Object} outer - Outer div DOMElement
     * @param {Object} message - Inner div DOMElement
     */
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
      /**
       * Delay to fade in message sent confirmation
       * Fades in the confirmation message after a delay of 1 second
       */
      setTimeout(function () {
        $('#contact-success').fadeIn(1000);
      }, 1000);
      const ackBtn = document.querySelector('#ack-btn');
      /** 
       * Event listener with function to close form submission success message and return main page content
       * It fades out the contact success message then fades in the main content after delay
       */
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

/**
 * Event lister with arrow function to fade contact form modal and return previous content if close button clicked
 */
modalClose.addEventListener('click', () => {
  "use strict";
  $("#contact-form-outer").fadeOut(1000);
});

/**
 * Function to check whether email address entered is a valid format
 * @param {string} email - email string value from user input on form
 * return {boolean} - returns true or false based on match to correct format
 */
function validateEmail(inputText) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.match(mailformat)) {
    return true;
  } else {
    /**
     * Swal give alert box style modal with error message to user.  Credit https://sweetalert2.github.io/
     */
    Swal.fire({
      title: 'Please enter a valid email address',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      background: '#383838',
      confirmButtonColor: 'rgb(45,112,147)',
      color: 'white',
    });
    return false;
  }
}