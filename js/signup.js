//

const usernameInput = document.querySelector('input[placeholder="Full Name"]');
const emailInput = document.querySelector('input[placeholder="Email Address"]');
const passwordInput = document.querySelector(
  'input[placeholder="Create Password"]'
);
const confirmPasswordInput = document.querySelector(
  'input[placeholder="Confirm Password"]'
);
const errormsg = document.querySelector(".errormsg");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Clear previous error styles/messages
  errormsg.innerText = "";
  confirmPasswordInput.style.outline = "";
  emailInput.style.outline = "";

  // Passwords match validation
  if (passwordInput.value !== confirmPasswordInput.value) {
    errormsg.innerText = "Passwords do not match";
    errormsg.style.color = "red";
    confirmPasswordInput.style.outline = "2px solid red";
    return;
  }

  // Email format validation
  if (!emailRegex.test(emailInput.value)) {
    errormsg.innerText = "Invalid email address";
    errormsg.style.color = "red";
    emailInput.style.outline = "2px solid red";
    return;
  }

  // Get existing users or empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check for duplicate email
  if (users.some((user) => user.email === emailInput.value)) {
    errormsg.innerText = "Email is already registered";
    errormsg.style.color = "red";
    emailInput.style.outline = "2px solid red";
    return;
  }

  // Add new user object (email & password only)
  users.push({
    email: emailInput.value,
    password: passwordInput.value,
  });

  // Save updated users array
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful!");
  window.location.href = "main.html";
});

// Real-time email validation outline
emailInput.addEventListener("input", () => {
  if (emailRegex.test(emailInput.value)) {
    emailInput.style.outline = "2px solid limegreen";
  } else {
    emailInput.style.outline = "2px solid red";
  }
});

// Navigation to login page
const loginpage = document.getElementById("login-link");
loginpage.addEventListener("click", function () {
  window.location.href = "../login/login.html";
});

// Toggle password visibility function
function togglePassword(inputId, iconElement) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  iconElement.textContent = isHidden ? "🙈" : "👁️";
}
