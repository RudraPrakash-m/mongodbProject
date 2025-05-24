document.addEventListener("DOMContentLoaded", function () {
  // === THEME TOGGLE ===
  const themeToggle = document.getElementById("input");
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  document.body.classList.add(savedTheme);
  if (themeToggle) themeToggle.checked = savedTheme === "light";

  themeToggle?.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? "light" : "dark";
    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  });

  // === MODAL FUNCTIONALITY ===
  const modal = document.getElementById("roadmapModal");
  const roadmapBtn = document.getElementById("roadmapBtn");
  const closeBtn = modal?.querySelector(".close");
  const modalContent = modal?.querySelector(".modal-content");

  function openModal() {
    if (!modal) return;
    modal.style.display = "block";
    modalContent?.focus();
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.style.display = "none";
    document.body.style.overflow = "";
    roadmapBtn?.focus();
  }

  roadmapBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });

  closeBtn?.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.style.display === "block") {
      closeModal();
    }
  });

  // typing effect
  const element = document.getElementById("typingText");
  const fullText = "From beginner to job-ready MongoDB developer with our structured learning path.";
  let index = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!isDeleting) {
      element.textContent = fullText.substring(0, index + 1);
      index++;
      if (index === fullText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Pause before deleting
        return;
      }
    } else {
      element.textContent = fullText.substring(0, index - 1);
      index--;
      if (index === 0) {
        isDeleting = false;
      }
    }

    const speed = isDeleting ? 60 : 60;
    setTimeout(typeEffect, speed);
  }
  typeEffect();

  // === QUIZ NAVIGATION ===
  const quizLink = document.getElementById("quizLink");
  quizLink?.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "./pages/quiz/quiz.html";
  });

  // === SMOOTH SCROLL FOR IN-PAGE LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || !document.querySelector(targetId)) return;

      e.preventDefault();

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        history.pushState(null, null, targetId);
      }
    });
  });

  // === INTERSECTION OBSERVER FOR ANIMATIONS ===
  const elementsToAnimate = document.querySelectorAll(
    ".feature-card, .timeline-content, .testimonial-card"
  );

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elementsToAnimate.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });

  // === START LEARNING BUTTON ===
  const startLearningBtn = document.getElementById("startLearningBtn");
  startLearningBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "../pages/note/note.html";
  });

  // === DEBOUNCE SCROLL HANDLING (for future use) ===
  let debounceScrollTimer;
  window.addEventListener("scroll", () => {
    window.clearTimeout(debounceScrollTimer);
    debounceScrollTimer = setTimeout(() => {
      // Scroll-based logic here if needed
    }, 66);
  });

  // === QUICK MESSAGE FORM SUBMISSION ===
  const quickMessageForm = document.getElementById("quickMessageForm");
  if (quickMessageForm) {
    quickMessageForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(quickMessageForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      console.log("Quick message form submitted:", data);
      quickMessageForm.reset();
    });
  }
});

// === EMAILJS INITIALIZATION ===
emailjs.init("imtW9DFyYZ13D_s86"); // Original EmailJS public key

const form = document.getElementById("quickMessageForm");
const submitBtn = form?.querySelector('button[type="submit"]');

form?.addEventListener("submit", function (event) {
  event.preventDefault();

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  const serviceID = "service_lkttw49";
  const templateID = "template_j8nhlje";

  emailjs
    .sendForm(serviceID, templateID, this)
    .then(() => {
      alert("Message sent successfully!");
      form.reset();
    })
    .catch((error) => {
      alert(
        "Failed to send message. Please try again.\n\nError: " +
          JSON.stringify(error)
      );
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send';
    });
});
