const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const errorMessage = document.querySelector(".errormsg");
const form = document.getElementById("loginForm");
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');

//! Handle form submission here
form.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent actual submission

  // Validate email format
  if (!emailRegex.test(emailInput.value)) {
    alert("Please enter a valid email.");
    return;
  }

  // Validate password is not empty and valid according to HTML validation
  if (!passwordInput.checkValidity()) {
    alert("Please enter your password.");
    return;
  }

  // Get users array from localStorage (or empty array if none)
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user exists with matching email & password
  const userExists = users.some(
    (user) =>
      user.email === emailInput.value && user.password === passwordInput.value
  );

  if (userExists) {
    // Successful login — redirect
    window.location.href = "./Home.html";
  } else {
    // Show error message
    errorMessage.innerHTML = `<p>Don't have an account? <br/><span>Register first?</span></p>`;
  }
});

//! Real-time email validation outline
emailInput.addEventListener("input", () => {
  if (emailRegex.test(emailInput.value)) {
    emailInput.style.outline = "2px solid limegreen";
  } else {
    emailInput.style.outline = "2px solid red";
  }
});

//! Redirect to signup page on click
document.querySelector(".signup").addEventListener("click", () => {
  window.location.href = "../signup/signup.html";
});
