

const dashboard = document.getElementById("dashboard");
const welcomeName = document.getElementById("welcome-name");
const logoutBtn = document.getElementById("logout-btn");


function checkAccess() {
  const session = getSession();

  if (!session) {
    window.location.replace("login.html");   
    return;
  }

  welcomeName.textContent = session.username;   
  dashboard.hidden = false;
}

checkAccess();


window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    dashboard.hidden = true;
    checkAccess();
  }
});

logoutBtn.addEventListener("click", function () {
  clearSession();
  window.location.replace("login.html");
});