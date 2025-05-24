const btn = document.getElementById("continueBtn");
const transition = document.getElementById("pageTransition");

btn.addEventListener("click", () => {
  transition.classList.add("active");
  setTimeout(() => {
    window.location.href = "Home.html";
  }, 1000);
});

const textElement = document.getElementById("typing-text");
const originalText = textElement.textContent;
let index = 0;

textElement.textContent = ""; // Clear the paragraph initially

function typeText() {
  if (index < originalText.length) {
    textElement.textContent += originalText.charAt(index);
    index++;
    setTimeout(typeText, 40); // Typing speed
  } else {
    setTimeout(() => {
      index = 0;
      textElement.textContent = "";
      typeText();
    }, 2000); // Wait 2 seconds before restarting
  }
}

window.addEventListener("load", typeText);

