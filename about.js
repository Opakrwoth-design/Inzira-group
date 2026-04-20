// ===================== HAMBURGER MENU =====================
const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileMenu = document.getElementById("mobile-menu");

hamburgerBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  mobileMenu.classList.toggle("flex");
});

// Close mobile menu when a link inside it is clicked
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
  });
});

// ===================== SCROLL NAVBAR =====================
const navbar = document.getElementById("navbar");

// Elements inside the navbar we need to restyle on scroll
const navLogo = navbar.querySelector("a.flex"); // logo link
const navLinks = navbar.querySelectorAll("ul li a");
const contactBtn = navbar.querySelector("a.hidden.md\\:inline-block");
const divider = navbar.querySelector(".border-t.border-gray-200");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 40;

  if (scrolled) {
    // Dark green background
    navbar.classList.remove("bg-white");
    navbar.classList.add("bg-[#103521]");

    // Logo text color → white
    navLogo.classList.remove("text-[#20324A]");
    navLogo.classList.add("text-white");

    // Nav links → white
    navLinks.forEach((link) => {
      link.classList.remove("text-[#20324A]");
      link.classList.add("text-white");
    });

    // Keep divider visible but shift its color to blend with dark navbar
    if (divider) {
      divider.classList.remove("border-gray-200");
      divider.classList.add("border-white/10");
    }

    // Contact button: text dark, hover bg white, hover text dark
    if (contactBtn) {
      contactBtn.classList.remove("hover:bg-[#20324A]", "hover:text-white", "text-[#20324A]");
      contactBtn.classList.add("hover:bg-white", "hover:text-[#1C343D]", "text-[#1C343D]");
    }
  } else {
    // Restore white background
    navbar.classList.add("bg-white");
    navbar.classList.remove("bg-[#103521]");

    // Logo text color → dark
    navLogo.classList.add("text-[#20324A]");
    navLogo.classList.remove("text-white");

    // Nav links → dark
    navLinks.forEach((link) => {
      link.classList.add("text-[#20324A]");
      link.classList.remove("text-white");
    });

    // Restore divider color for white navbar
    if (divider) {
      divider.classList.add("border-gray-200");
      divider.classList.remove("border-white/10");
    }

    // Restore contact button: text dark, hover bg dark, hover text white
    if (contactBtn) {
      contactBtn.classList.add("hover:bg-[#20324A]", "hover:text-white", "text-[#20324A]");
      contactBtn.classList.remove("hover:bg-white", "hover:text-[#1C343D]", "text-[#1C343D]");
    }
  }
});

// ===================== FADE-UP SCROLL ANIMATIONS =====================
const fadeEls = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeEls.forEach((el) => observer.observe(el));