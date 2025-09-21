const username = document.getElementById("username");
const confirmInput = document.getElementById("confirmPassword");
const passwordInput = document.getElementById("password");
const matchText = document.getElementById("match");
const strengthText = document.getElementById("strength");
const button = document.getElementById("button");
const pmApi = "http://localhost:3000/User";

var acceptPas = false;
var acceptUser = false;


//Register-checking
passwordInput.addEventListener("input", function(){
    const password = passwordInput.value;

    if (/\s/.test(password)) {
        strengthText.textContent = "Mật khẩu không được chứa dấu cách";
        strengthText.style.background = "red";
        strengthText.style.color = "white";
        return;
    }

    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (password.length === 0) {
        strengthText.textContent = "Chưa nhập mật khẩu";
        strengthText.style.background = "transparent";
    }
    else if (strength <= 2) {
        strengthText.textContent = "Yếu";
        strengthText.style.background = "red";
        strengthText.style.color = "white";
    }
    else if (strength == 3 || strength == 4) {
        strengthText.textContent = "Trung bình";
        strengthText.style.background = "orange";
        strengthText.style.color = "white";
    }
    else {
        strengthText.textContent = "Mạnh";
        strengthText.style.background = "green";
        strengthText.style.color = "white";
    }
    if (username.value.length > 1)
        acceptUser = true;
})

confirmInput.addEventListener("input", function() {
    if (confirmInput.value === passwordInput.value) {
        matchText.textContent = "Mật khẩu khớp";
        matchText.style.background = "lightgreen";
        button.disabled = false;
        acceptPas = true;
    }
    else {
        matchText.textContent = "Mật khẩu chưa khớp";
        matchText.style.background  = "red";
        button.disabled = true;
    }
})


//Register
function Register() {
    var username = document.querySelector('#username').value;
    var password = document.querySelector('#confirmPassword').value;

    if (username.length <= 0 || password.length <= 0) {
        alert('Vui lòng không để trống!');
        return;
    }

    const new_User = {
        "username" : username,
        "password" : password
    }

    if (acceptPas && acceptUser) {
        if (checkExist(username).then(function(exist){
            if (exist)
                return;
        }))
        Insert(new_User);
    }
}

function Insert (user) {
    var options = {
        method: 'POST',
        body: JSON.stringify(user)
    }
    fetch(pmApi, options)
}

function checkExist (username) {
    var checkQuery = pmApi + `?username=${username}`;

    fetch(checkQuery)
        .then(function(respone){
            return respone.json();
        })
        .then(function(data) {
            if (data.length > 0) {
                alert('Tên đăng nhập đã tồn tại!');
                return true;
            }
            return false;
        })
}

//Display
const login = document.querySelector('.container-login');
const register = document.querySelector('.container-register');

function showLogin() {
    register.style.display = "none";
    login.style.display = "block";
}

function showRegister () {
    register.style.display = "block";
    login.style.display = "none";
}

//Login
function auThication () {
    const username = document.querySelector('.l-username').value;
    const password = document.querySelector('.l-password').value;

    if (username.length > 0 && password.length > 0)
        checkUser(username, password);
    else {
        alert('Vui lòng không để trống!')
    }
}

function checkUser (username, password) {
    var checkQuery = pmApi + `?username=${username}&password=${password}`;
    
    fetch(checkQuery)
        .then(function(response){
            return response.json();
        })
        .then (function(data){
            if (data.length > 0)
                alert('Đăng nhập thành công!');
            else {
                alert('Sai tài khoản hoặc mật khẩu!');
            }
        })
}