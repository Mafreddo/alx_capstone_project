var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

function register(){
    x.style.left = "-400px";
    y.style.left ="50px";
    z.style.left ="110px";
}
function login(){
    x.style.left = "50px";
    y.style.left ="450px";
    z.style.left ="0px";
}
function validate(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    if(email == "admin@gmail.com" && password == "admin123"){
        alert("Login Successful");
        window.location.replace("index.html");
        return false;
    }
    else{
        alert("Login failed");
    }
}
