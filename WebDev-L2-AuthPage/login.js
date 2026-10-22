
if (getSession()) {
  window.location.replace("dashboard.html");
}

const form = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = usernameInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  usernameInput.classList.remove("invalid");
  passwordInput.classList.remove("invalid");

  // no empty fields
  if (username === "" || password === "") {
    showMessage(message, "Please fill in all fields.", "error");
    if (username === "") usernameInput.classList.add("invalid");
    if (password === "") passwordInput.classList.add("invalid");
    return;
  }


  const user = findUser(username);
  let passwordMatches = false;

  if (user) {
    const typedHash = await hashPassword(password, user.salt);
    passwordMatches = (typedHash === user.passwordHash);
  }


  if (!user || !passwordMatches) {
    showMessage(message, "Invalid username or password.", "error");
    return;
  }

  setSession(user.username);                
  window.location.href = "dashboard.html";
});

[usernameInput, passwordInput].forEach(function (input) {
  input.addEventListener("input", function () {
    input.classList.remove("invalid");
    clearMessage(message);
  });
});