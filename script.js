window.addEventListener("scroll", function() {
  var sidebar = document.querySelector(".sidebar");
  
  if (window.pageYOffset > 20) {
    sidebar.classList.add("sticky");
  } else {
    sidebar.classList.remove("sticky");
  }
});


//main chane
const navLinks = document.querySelectorAll('.nav-link');
const mainSections = document.querySelectorAll('main');

navLinks.forEach(link => {
  link.addEventListener('click', function() {
    const targetSection = this.getAttribute('data-target');

    mainSections.forEach(section => {
      if (section.classList.contains(targetSection)) {
        section.style.display = 'block';
        setTimeout(() => {
          section.classList.add('main-slide-in');
          section.classList.remove('main-slide-out'); // Remove slide-out class
        }, 0);
      } else {
        section.classList.remove('main-slide-in'); // Remove slide-in class
        section.classList.add('main-slide-out');
        setTimeout(() => {
          section.style.display = 'none';
          section.classList.remove('main-slide-out');
        }, 500);
      }
    });
  });
});

//automation preview 
const link = document.querySelector('.link');
const cardContainer = document.querySelector('.card-container');
const previewAutomation = document.querySelector('.preview-automation');
const closeBtn = document.querySelector('.close-btn');

link.addEventListener('click', function (event) {
  event.preventDefault();
  
  // Apply scaling animation to card-container
  cardContainer.classList.add('scale-down');

  // Show preview-automation popup
  previewAutomation.style.display = 'block';
});

closeBtn.addEventListener('click', function () {
  cardContainer.classList.remove('scale-down');
  previewAutomation.style.display = 'none';
});

//typing effect
const textContainer = document.querySelector('.heading-large');
const texts = [
  'Automation Grows Business',
  'Automation Saves Time',
  'Automation Reduces Cost'
];

let textIndex = 0;
let charIndex = 0;

function typeText() {
  if (charIndex < texts[textIndex].length) {
    textContainer.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 100); // Delay between typing each character
  } else {
    setTimeout(eraseText, 1500); // Delay before erasing text
  }
}

function eraseText() {
  if (charIndex > 0) {
    textContainer.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseText, 50); // Delay between erasing each character
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(typeText, 500); // Delay before typing the next text
  }
}

typeText(); // Start the typing effect


//form response main
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form data
    const formData = new FormData(form);

    // Convert form data to JSON object
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    // Send data to the specified URL using Fetch API
    fetch("https://webhook.site/d1685e92-8e71-4bd8-9674-faee36ee506b", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formDataObject)
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server if needed
        console.log(data);
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error(error);
      });

    // Reset the form after submission
    form.reset();
  });
});
