const USERS_KEY = "users";
const SESSION_KEY = "session";



async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
}


function generateSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
}

function hashPassword(password, salt) {
  return sha256(salt + password);
}



function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch (error) {
    return [];      
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function findUser(username) {
  return getUsers().find(function (user) { return user.username === username; });
}



function setSession(username) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username: username }));
}

function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch (error) {
    return null;
  }
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}


function isValidPassword(password) {
  return password.length >= 8 && /\d/.test(password);
}

function showMessage(element, text, type) {
  element.textContent = text;
  element.className = "message " + type;    
}

function clearMessage(element) {
  element.textContent = "";
  element.className = "message";
}