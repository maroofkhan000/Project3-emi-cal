// Switch active card view
const show = (id) => {
  document.getElementById("login").style.display =
    id === "login" ? "block" : "none";
  document.getElementById("reg").style.display =
    id === "reg" ? "block" : "none";
  document.getElementById("dash").style.display =
    id === "dash" ? "block" : "none";
};

// Retrieve users array from LocalStorage
const getUsers = () => JSON.parse(localStorage.getItem("users") || "[]");

// Password Visibility Toggle
document.querySelectorAll(".eye-btn").forEach((btn) => {
  btn.onclick = () => {
    const input = btn.previousElementSibling;
    input.type = input.type === "password" ? "text" : "password";
    btn.textContent = input.type === "password" ? "🙈" : "👁️";
  };
});

// View switches
document.getElementById("to-reg").onclick = () => show("reg");
document.getElementById("to-login").onclick = () => show("login");

// Handle user registration
document.getElementById("reg-form").onsubmit = (e) => {
  e.preventDefault();
  const u = document.getElementById("reg-user").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const pass = document.getElementById("reg-pass").value;
  const cpass = document.getElementById("reg-cpass").value;
  const users = getUsers();

  if (pass !== cpass) return alert("Passwords do not match");
  if (users.some((x) => x.username === u))
    return alert("Username is already taken");

  users.push({ username: u, email: email, password: pass });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful!");
  document.getElementById("reg-form").reset();
  show("login");
  document.getElementById("login-id").value = u;
};

// Handle user login
document.getElementById("login-form").onsubmit = (e) => {
  e.preventDefault();
  const id = document.getElementById("login-id").value.trim();
  const pass = document.getElementById("login-pass").value;

  const user = getUsers().find((x) => x.username === id && x.password === pass);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    loadDash(user);
  } else {
    document.getElementById("login-err").style.display = "block";
  }
};

// Populate and load dashboard data
const loadDash = (user) => {
  document.getElementById("dash-user").textContent = user.username;
  document.getElementById("dash-email").textContent = user.email;
  show("dash");
};

// Handle logout session
document.getElementById("logout").onclick = () => {
  localStorage.removeItem("currentUser");
  document.getElementById("login-form").reset();
  document.getElementById("login-err").style.display = "none";
  show("login");
};

// Initial session check
const session = JSON.parse(localStorage.getItem("currentUser"));
if (session) {
  loadDash(session);
} else {
  show("login");
}
