// For navbar toggle//
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];
//To add launch button for own modal
const contactLaunch = document.querySelector('#contact-launch');
//To add listener for own modal
const contactFormOuter = document.querySelector('#contact-form-outer');
//To grab main divs for sucess message fade in and out
const mainContent = document.getElementById('about-main-content');
// Grab to add and remove function created child
const mainContainer = document.getElementById('about-main-container');
//To use variable with Jquery to hide and reveal main content
const mainContentId = mainContent.getAttribute('id');

//Toggle for main nav bar
toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
});

//Modal review on planet select


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
        $('#reload').click(function() {
            document.location.reload();
        });
      });
    }
  });
};


//listener in jquery to get ID of target
$('#earth-container').click(getID);
//Fuction to process ID
function getID(event) {
  let planetElement = event.target;
  let planetId = planetElement.id;
  //Pass id to figureModalContent function
  figureModalContent (planetId);
}
//Function to set variable based on switch
function figureModalContent(planet) {
  //declare variables
  let planetName;
  let planetHTML;

  switch(planet){
    case 'sun':
      planetName = planetArray[0].name;
      planetHTML = planetArray[0].summary;
      console.log(planetName, planetHTML);
      break;
    case 'mercury':
      planetName = planetArray[1].name;
      planetHTML = planetArray[1].summary;
      console.log(planetName, planetHTML);
      break;
    case 'venus':
      planetName = planetArray[2].name;
      planetHTML = planetArray[2].summary;
      console.log(planetName, planetHTML);      
      break;
    case 'earth':
      planetName = planetArray[3].name;
      planetHTML = planetArray[3].summary;
      console.log(planetName, planetHTML);      
      break;
    case 'mars':
      planetName = planetArray[4].name;
      planetHTML = planetArray[4].summary;
      console.log(planetName, planetHTML);      
      break;
    case 'jupiter':
      planetName = planetArray[5].name;
      planetHTML = planetArray[5].summary;
      console.log(planetName, planetHTML);      
      break;
    case 'saturn':
      planetName = planetArray[6].name;
      planetHTML = planetArray[6].summary;
      console.log(planetName, planetHTML);      
      break;
    case 'uranus':
      planetName = planetArray[7].name;
      planetHTML = planetArray[7].summary;
      console.log(planetName, planetHTML);      
      break;
    case 'neptune':
      planetName = planetArray[8].name;
      planetHTML = planetArray[8].summary;
      console.log(planetName, planetHTML);      
      break;
  }
  //Call function to assign modal content
  assignModal(planetName,planetHTML);
}
// Function to assign modal content
function assignModal(name, text){
  // declare variables
  let planetModalTitle = document.querySelector('#planetModalTitle');
  let planetModalBody = document.querySelector('#planetModalBody');
  // set modal content
  planetModalTitle.innerHTML = name;
  planetModalBody.innerHTML = text;
  // call function
  showModal();
}

//Function to show modal
function showModal(){
  $('#planetModal').modal('show');
}

//Object to hold planet data for mobile devices
//Text data taken from NASA website https://solarsystem.nasa.gov/
let planetArray = [
  {
    name:'Sun',
    summary: 
    `
    <p>Our Sun – the heart of our solar system – is a yellow dwarf star, a hot ball of glowing gases. Its gravity holds the solar system together, keeping everything from the biggest planets to the smallest particles of debris in its orbit. Electric currents in the Sun generate a magnetic field that is carried out through the solar system by the solar wind – a stream of electrically charged gas blowing outward from the Sun in all directions.</p>
    <p>The Sun is the largest object in our solar system, comprising 99.8% of the system’s mass. Though it seems huge to us, the Sun isn't as large as other types of stars.</p>
    <p>Earth orbits the Sun from a distance of about 93 million miles. The connection and interactions between the Sun and Earth drive our planet's seasons, ocean currents, weather, climate, radiation belts, and aurorae. Though it is special to us, there are billions of stars like our Sun scattered across the Milky Way galaxy.</p>
    `
  },
  {
    name: 'Mercury',
    summary: 
    `
    <p>The smallest planet in our solar system and nearest to the Sun, Mercury is only slightly larger than Earth's Moon.</p>
    <p>From the surface of Mercury, the Sun would appear more than three times as large as it does when viewed from Earth, and the sunlight would be as much as seven times brighter. Despite its proximity to the Sun, Mercury is not the hottest planet in our solar system – that title belongs to nearby Venus, thanks to its dense atmosphere.</p>
    `
  },
  {
    name:'Venus',
    summary:
    `
    <p>Venus is the second planet from the Sun and is Earth’s closest planetary neighbor. It’s one of the four inner, terrestrial (or rocky) planets, and it’s often called Earth’s twin because it’s similar in size and density. These are not identical twins, however – there are radical differences between the two worlds.</p>
    <p>Venus has a thick, toxic atmosphere filled with carbon dioxide and it’s perpetually shrouded in thick, yellowish clouds of sulfuric acid that trap heat, causing a runaway greenhouse effect. It’s the hottest planet in our solar system, even though Mercury is closer to the Sun. Surface temperatures on Venus are about 900 degrees Fahrenheit (475 degrees Celsius) – hot enough to melt lead. The surface is a rusty color and it’s peppered with intensely crunched mountains and thousands of large volcanoes. Scientists think it’s possible some volcanoes are still active.</p>

    <p>Venus has crushing air pressure at its surface – more than 90 times that of Earth – similar to the pressure you'd encounter a mile below the ocean on Earth.</p>
    
    <p>Another big difference from Earth – Venus rotates on its axis backward, compared to most of the other planets in the solar system. This means that, on Venus, the Sun rises in the west and sets in the east, opposite to what we experience on Earth.</p>
    `
  },
  {
    name:'Earth',
    summary: 
    `
    <p>Our home planet is the third planet from the Sun, and the only place we know of so far that’s inhabited by living things.</p>
    <p>While Earth is only the fifth largest planet in the solar system, it is the only world in our solar system with liquid water on the surface. Just slightly larger than nearby Venus, Earth is the biggest of the four planets closest to the Sun, all of which are made of rock and metal.</p>

    <p>The name Earth is at least 1,000 years old. All of the planets, except for Earth, were named after Greek and Roman gods and goddesses. However, the name Earth is a Germanic word, which simply means “the ground.”</p>
    `
  },
  {
    name:'Mars',
    summary:
    `
    <p>Mars is the fourth planet from the Sun – a dusty, cold, desert world with a very thin atmosphere. Mars is also a dynamic planet with seasons, polar ice caps, canyons, extinct volcanoes, and evidence that it was even more active in the past.</p>
    <p>Mars is one of the most explored bodies in our solar system, and it's the only planet where we've sent rovers to roam the alien landscape.</p>
    `
  },
  {
    name:'Jupiter',
    summary:
    `
    <p>Saturn is the sixth planet from the Sun and the second-largest planet in our solar system.</p>
    <p>Adorned with thousands of beautiful ringlets, Saturn is unique among the planets. It is not the only planet to have rings – made of chunks of ice and rock – but none are as spectacular or as complicated as Saturn's.</p>
    <p>Like fellow gas giant Jupiter, Saturn is a massive ball made mostly of hydrogen and helium.</p>
    `
  },
  {
    name:'Saturn',
    summary:
    `
    <p>Saturn is the sixth planet from the Sun and the second-largest planet in our solar system.</p>
    <p>Adorned with thousands of beautiful ringlets, Saturn is unique among the planets. It is not the only planet to have rings – made of chunks of ice and rock – but none are as spectacular or as complicated as Saturn's.</p>
    <p>Like fellow gas giant Jupiter, Saturn is a massive ball made mostly of hydrogen and helium.</p>
    `
  },
  {
    name:'Uranus',
    summary:
    `
    <p>Uranus is the seventh planet from the Sun, and has the third-largest diameter in our solar system. It was the first planet found with the aid of a telescope, Uranus was discovered in 1781 by astronomer William Herschel, although he originally thought it was either a comet or a star.</p>
    <p>It was two years later that the object was universally accepted as a new planet, in part because of observations by astronomer Johann Elert Bode. Herschel tried unsuccessfully to name his discovery Georgium Sidus after King George III. Instead, the scientific community accepted Bode's suggestion to name it Uranus, the Greek god of the sky, as suggested by Bode.​</p>
    `
  },
  {
    name:'Neptune',
    summary:
    `
    <p>Dark, cold, and whipped by supersonic winds, ice giant Neptune is the eighth and most distant planet in our solar system.</p>
    <p>More than 30 times as far from the Sun as Earth, Neptune is the only planet in our solar system not visible to the naked eye and the first predicted by mathematics before its discovery. In 2011 Neptune completed its first 165-year orbit since its discovery in 1846.</p>
    `
  }];