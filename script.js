// ===== Page zoom (desktop only) =====
// Works out how much the page should shrink on screens narrower than 1920px.
// The result is stored in the CSS variable --z, which style.css uses for "zoom".
// On tablets and phones (1100px or less) there is no zoom.
function updatePageZoom() {
  var screenWidth = document.documentElement.clientWidth;
  var zoom = screenWidth <= 1100 ? 1 : Math.min(1, screenWidth / 1920).toFixed(4);
  document.documentElement.style.setProperty('--z', zoom);
}

updatePageZoom();
window.addEventListener('resize', updatePageZoom);


// ===== Offer tabs =====
// The text shown for each tab (same order as the buttons in the HTML).
var offers = [
  {
    price: "45 €",
    name: "Offre Small",
    description: "Un Expert-Comptable Comptaways vous accompagne dans l'accompagnement de votre entreprise individuelle avec un accès à notre application pro."
  },
  {
    price: "89 €",
    name: "Offre Medium",
    description: "Pour les petites entreprises : comptabilité complète, bilan certifié et conseils réguliers de votre expert-comptable."
  },
  {
    price: "0 €",
    name: "Création offerte",
    description: "Nous créons votre entreprise gratuitement et vous accompagnons dans toutes vos démarches administratives."
  }
];

var offerTabs = document.querySelectorAll('.offer-tab');
var offerPrice = document.getElementById('offer-price-value');
var offerName = document.getElementById('offer-name');
var offerDescription = document.getElementById('offer-description');

// Highlights the clicked tab and shows the matching offer text.
function showOffer(clickedTab) {
  offerTabs.forEach(function (tab) {
    tab.classList.remove('active');
  });
  clickedTab.classList.add('active');

  var offer = offers[clickedTab.dataset.offerIndex];
  offerPrice.textContent = offer.price;
  offerName.textContent = offer.name;
  offerDescription.textContent = offer.description;
}

offerTabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    showOffer(tab);
  });
});


// ===== Reviews carousel =====
var reviewsTrack = document.getElementById('reviews-track');
var previousButton = document.getElementById('prev-review');
var nextButton = document.getElementById('next-review');

// Moves the reviews around: direction 1 sends the first card to the end,
// direction -1 brings the last card to the front.
function rotateReviews(direction) {
  var cards = Array.from(reviewsTrack.children);

  if (direction > 0) {
    reviewsTrack.appendChild(cards[0]);
  } else {
    reviewsTrack.insertBefore(cards[cards.length - 1], cards[0]);
  }
}

nextButton.addEventListener('click', function () {
  rotateReviews(1);
});

previousButton.addEventListener('click', function () {
  rotateReviews(-1);
});


// ===== Mobile menu =====
var navigation = document.querySelector('nav');
var menuToggle = navigation.querySelector('.menu-toggle');

// Opens or closes the mobile menu and updates the button labels for screen readers.
function setMobileMenu(isOpen) {
  navigation.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
}

// Burger button: open if closed, close if open
menuToggle.addEventListener('click', function () {
  setMobileMenu(!navigation.classList.contains('open'));
});

// Close the menu after clicking one of its links
navigation.querySelectorAll('.mobile-menu a').forEach(function (link) {
  link.addEventListener('click', function () {
    setMobileMenu(false);
  });
});

// Close the menu with the Escape key
window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    setMobileMenu(false);
  }
});

// Close the menu if the window becomes desktop-sized
window.addEventListener('resize', function () {
  if (window.innerWidth > 1100) {
    setMobileMenu(false);
  }
});


// ===== Contact form =====
// Stops the page from reloading and shows a "message sent" text on the button.
// (There is no real sending yet: you will need a backend or a form service for that.)
var contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function (event) {
  event.preventDefault();
  contactForm.querySelector('.btn').textContent = 'Message envoyé ✓';
});