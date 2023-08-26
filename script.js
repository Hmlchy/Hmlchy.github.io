window.addEventListener("scroll", function() {
  var sidebar = document.querySelector(".sidebar");
  
  if (window.pageYOffset > 20) {
    sidebar.classList.add("sticky");
  } else {
    sidebar.classList.remove("sticky");
  }
});


//main sidebar nav
const navLinks = document.querySelectorAll('.nav-link');
const mainSections = document.querySelectorAll('main');

navLinks.forEach(link => {
  link.addEventListener('click', function() {
    const targetSection = this.getAttribute('data-target');

    navLinks.forEach(navLink => {
      if (navLink === this) {
        navLink.classList.add('selected'); // Add the selected class to the clicked link
      } else {
        navLink.classList.remove('selected'); // Remove the selected class from other links
      }
    });

    mainSections.forEach(section => {
      if (section.classList.contains(targetSection)) {
        section.style.display = 'block';
        setTimeout(() => {
          section.classList.add('main-slide-in');
          section.classList.remove('main-slide-out');
        }, 0);
      } else {
        section.classList.remove('main-slide-in');
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



//form submission contact form
function handleFormSubmit(formId) {
  const form = document.getElementById(formId);
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      formId: form.id,
      email: formData.get("email"),
      name: formData.get("name"),
      request: formData.get("request") // For the first form, adjust this line if needed
    };

    fetch("https://script.google.com/macros/s/AKfycbw2adJ5syQguxZ0eXLGa6RITSaLs8HV0HL4eMOVtaji316VYcxMPFzneO8fiYD6MeSH/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Response from server:", data);
      // You can add additional code here to handle the response
    })
    .catch(error => {
      console.error("Error sending data:", error);
      // You can add error handling code here
    })
    .finally(() => {
      // Reset the form regardless of success or failure
      form.reset();
    });
  });
}

// Call the function to handle both forms
handleFormSubmit("CF-contactForm");
handleFormSubmit("myForm");

//progress bar animation
const progressBars = document.querySelectorAll(".progress-bar");

progressBars.forEach((progressBar) => {
  let currentWidth = 0;
  const targetWidth = parseInt(progressBar.getAttribute("end"));

  const updateProgressBar = () => {
    currentWidth++;
    progressBar.style.width = currentWidth + "%";

    if (currentWidth < targetWidth) {
      requestAnimationFrame(updateProgressBar);
    }
  };

  window.addEventListener("load", () => {
    updateProgressBar();
  });
});
