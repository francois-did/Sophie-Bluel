document.addEventListener("DOMContentLoaded", function() {
   
    const email = document.querySelector("form #inputUsername");
    const password = document.querySelector("form #inputPassword");
    const formLogin = document.getElementById("formLogin");

    // Fonction Connexion à la page index.html
    async function login(event) {

        event.preventDefault(); 

        
        const userEmail = email.value;
        const userPassword = password.value;

        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email: userEmail, password: userPassword })
        });

        const data = await response.json();
        
        // Connexion ok ou non
        if (response.status === 200) {
            window.sessionStorage.logged = true;
            localStorage.setItem("token", data.token);

            // Si id = 1, Connexion Administrateur
            window.sessionStorage.admin = data.userId === 1;
            
            window.location.href = "../index.html";
          
        } else {
            const error = document.querySelector(".loginContainerTitre p");
            error.textContent = "Erreur : email ou mot de passe incorrect";
            error.classList.add("errorMessage");
        }
        
    }
     
   
// Soumettre le formulaire au click sur le bouton 
function test(){
formLogin.addEventListener("submit", login);
const buttonSubmit = document.getElementById("buttonSubmit");
buttonSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    login(event);
});

}
test(); 
   

    
});




