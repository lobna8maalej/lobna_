

function login() {
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();

    
    if (email === "lobnamaalej89@gmail.com" && password === "powerbi") {
        
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email); 

        
        window.location.href = "transaction.html";
    } else {
        document.getElementById("error").textContent = "Email ou mot de passe incorrect";
    }
}


function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail"); 
    window.location.href = "powerbi.html"; 
}


if (window.location.pathname.includes("transaction.html")) {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "powerbi.html"; 
    }
}


var userEmail = localStorage.getItem("userEmail");
if(userEmail){
    console.log("Utilisateur connecté :", userEmail);
}