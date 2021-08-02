// For navbar toggle//
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

//for contact form button

window.onload = function() {
  document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault();
      emailjs.init("user_mrJgfpy8vz9l8LqeGGrjA");
      // these IDs from the previous steps
      emailjs.sendForm('service_y7rgdam', 'dans_template', this)
          .then(function() {
              console.log('SUCCESS!');
          }, function(error) {
              console.log('FAILED...', error);
          });
  });
}

//css rule for nav button highlight//

