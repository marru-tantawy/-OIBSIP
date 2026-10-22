const form = document.getElementById("register-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {
  event.preventDefault();                                 

  const username = usernameInput.value.trim().toLowerCase();
  const password = passwordInput.value;                   

  usernameInput.classList.remove("invalid");
  passwordInput.classList.remove("invalid");

  if (username === "" || password === "") {
    showMessage(message, "Please fill in all fields.", "error");
    if (username === "") usernameInput.classList.add("invalid");
    if (password === "") passwordInput.classList.add("invalid");
    return;
  }

  if (!isValidPassword(password)) {
    showMessage(message, "Password must be at least 8 characters and include a number.", "error");
    passwordInput.classList.add("invalid");
    return;
  }

  if (findUser(username)) {
    showMessage(message, "This username or email is already registered.", "error");
    usernameInput.classList.add("invalid");
    return;
  }

  
  const salt = generateSalt();
  const passwordHash = await hashPassword(password, salt);

  const users = getUsers();
  users.push({ username: username, salt: salt, passwordHash: passwordHash });
  saveUsers(users);

  showMessage(message, "Account created! Redirecting to login...", "success");
  form.reset();

  setTimeout(function () {
    window.location.href = "login.html";
  }, 1200);
});


[usernameInput, passwordInput].forEach(function (input) {
  input.addEventListener("input", function () {
    input.classList.remove("invalid");
    clearMessage(message);
  });
});