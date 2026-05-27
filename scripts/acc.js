function get_users() 
{
    return JSON.parse(localStorage.getItem("users") || "[]");
}

function save_user(user) 
{
    localStorage.setItem("users", JSON.stringify(user));
}

function set_current_user(user)
{
    sessionStorage.setItem("currentUser", JSON.stringify(user));
}

function get_current_user()
{
    return JSON.parse(sessionStorage.getItem("currentUser") || "null");
}

function registration(e) {
  e.preventDefault();

const username = document.getElementById("username").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const checkPassword = document.getElementById("check-password").value;

if (username.length < 8) 
{
    alert("Имя пользователя должно cодержать минимум 8 символов");
    return;
}

if (password.length < 8) 
{
    alert("Пароль должен содержать минимум 8 символов");
    return;
}

if (password !== checkPassword) 
{
    alert("Пароли не совпадают");
    return;
}

const users = get_users();

if (users.find(u => u.username === username)) 
{
    alert("Пользователь с таким именем уже существует");
    return;
}

if (users.find(u => u.email === email)) 
{
    alert("Этот email уже зарегистрирован");
    return;
}

const new_user = {username, email, password };
users.push(new_user);
save_user(users);

set_current_user({ username, email });
window.location.href = "pole.html";
}


function signIn(e) {
e.preventDefault();

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

const users = get_users();
const user = users.find(u => u.username === username && u.password === password);

if (!user) 
{
    alert("Неверное имя пользователя или пароль");
    return;
}
set_current_user({ username: user.username, email: user.email });
window.location.href = "pole.html";
}
