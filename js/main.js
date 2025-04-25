// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu after clicking a link
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
});

// Form submission handling
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    alert("Thank you for your message! We will get back to you soon.");
    this.reset();
  });
}

// Cyberpunk particle effect for hero section
function createParticles() {
  const hero = document.querySelector(".hero");
  const particleContainer = document.createElement("div");
  particleContainer.className = "particles";

  // Add CSS for particles
  const style = document.createElement("style");
  style.textContent = `
    .particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 0;
    }
    .particle {
      position: absolute;
      width: 2px;
      height: 2px;
      background-color: rgba(168, 85, 247, 0.6);
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
    }
  `;
  document.head.appendChild(style);

  if (hero) {
    hero.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;

      // Random size
      const size = Math.random() * 3 + 1;

      // Random opacity
      const opacity = Math.random() * 0.5 + 0.3;

      // Random animation duration
      const duration = Math.random() * 20 + 10;

      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = opacity;
      particle.style.animation = `floatParticle ${duration}s linear infinite`;

      particleContainer.appendChild(particle);
    }

    // Add keyframes animation
    const keyframes = document.createElement("style");
    keyframes.textContent = `
      @keyframes floatParticle {
        0% {
          transform: translate(0, 0);
        }
        25% {
          transform: translate(10px, 10px);
        }
        50% {
          transform: translate(0, 20px);
        }
        75% {
          transform: translate(-10px, 10px);
        }
        100% {
          transform: translate(0, 0);
        }
      }
    `;
    document.head.appendChild(keyframes);
  }
}

// Typing effect for hero title
function typingEffect() {
  const heroTitle = document.querySelector(".hero-content h1");
  const originalText = heroTitle.innerText;
  heroTitle.innerText = "";

  let charIndex = 0;

  function typeChar() {
    if (charIndex < originalText.length) {
      heroTitle.innerText += originalText.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, 100);
    }
  }

  // Start typing after a delay
  setTimeout(() => {
    heroTitle.style.animation = "none";
    typeChar();
  }, 1000);
}

// Initialize effects on load
window.addEventListener("load", () => {
  createParticles();
  // Uncomment if you want the typing effect
  // typingEffect();
});

// Scroll-based animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Observe service cards for staggered animation
document.querySelectorAll(".service-card").forEach((card, index) => {
  // Add initial styles
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";

  // Create a new observer
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add staggered animation
        setTimeout(() => {
          card.style.transition = "all 0.5s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, index * 200);
        cardObserver.unobserve(card);
      }
    });
  }, observerOptions);

  cardObserver.observe(card);
});

// Add scroll-based header styling
const header = document.querySelector("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
    // Scrolling down
    header.classList.remove("scroll-up");
    header.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    header.classList.contains("scroll-down")
  ) {
    // Scrolling up
    header.classList.remove("scroll-down");
    header.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
});
