// categories = api/categories  
// category = chaque éléménts dans l'api/categories

// worksData = api/works
// work = chaque éléments de la galerie

const gallery = document.querySelector('.gallery');
let worksData = [];

// Récupération des donnés works dans l'API
async function fetchAndDisplayWorks() {

    const response = await fetch('http://localhost:5678/api/works'); 
    worksData = await response.json();
    displayWorks(worksData);
}

// Création dynamique des éléments 
function displayWorks(works) {
  
  gallery.innerHTML = '';

  // Créer les éléments
  works.forEach(work => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    img.src = work.imageUrl;
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    gallery.appendChild(figure);
  });
}

fetchAndDisplayWorks();


// Création dynamique des boutons des filtrage
const filterContainer = document.querySelector(".filterProject");

async function getFilter (){
  const response = await fetch("http://localhost:5678/api/categories")
  return response.json();
}

const categories = await getFilter();


function filterData (categories){
  const button = document.createElement("button")
    button.innerText = "Tous";
    button.classList.add("filter-button");
    button.id = "Tous";
    filterContainer.appendChild(button);

  
    

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.innerText = category.name;
      button.id = category.id;
      button.classList.add("filter-button");
      filterContainer.appendChild(button);
    })

    
 
}

filterData(categories);


const buttonAll = document.getElementById("Tous");

//Ajout/enlever la couleur du bouton au click
buttonAll.addEventListener("click", () => {
  document.querySelectorAll(".filter-button").forEach(btn => {
    btn.classList.remove("active");
  });
  buttonAll.classList.add("active");
  fetchAndDisplayWorks();
})

//Filtrer les catégories au click du bouton
categories.forEach((category) => {
  const button = document.getElementById(category.id);

  button.addEventListener("click", () => {

    document.querySelectorAll(".filter-button").forEach(btn => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    
    const filteredWorks = worksData.filter((work) => {
     
      return work.categoryId === category.id;

      });

    displayWorks(filteredWorks);
  });
});



// aller vers la page login
// Aller vers la page login
function Logout() {
  const loginLien = document.getElementById("loginLien");
  loginLien.addEventListener("click", () => {
    if (localStorage.getItem('token') !== null) {
      localStorage.removeItem('token');
      loginLien.textContent = "Login";
      window.sessionStorage.admin = false;
      window.location.href = "index.html";
    } else {
      window.location.href = "login/connexion.html";
    }
  });
}

Logout();






    
   

// Afficher la modale
function afficherModale(){
  let modaleCadre = document.querySelector(".modale");
  let adminText = document.getElementById("adminText");
  let croiX = document.querySelector(".croix p");
  let modaleBackground = document.querySelector(".modaleBackground");
  
  adminText.addEventListener("click", () =>{
    modaleBackground.style.display = "flex";
    modaleCadre.style.display = "block";
  });

  //Enlever la modale
  croiX.addEventListener("click", () =>{
    modaleBackground.style.display = "none";
  });

  modaleBackground.addEventListener("click", (e) =>{
    if(e.target.className == "modaleBackground"){
      modaleBackground.style.display = "none";
    }
    
  })

};

afficherModale();




//première modale
function premiereModale() {
  let galleryContent = document.querySelector(".galleryContainer"); 
  galleryContent.innerHTML = "";
  
  worksData.forEach(worksGallery => {
    const galleryDiv = document.createElement("div");
    galleryDiv.classList.add("divImagesContent");

    const imageGallery = document.createElement("img");
    imageGallery.src = worksGallery.imageUrl;
    imageGallery.id = "imageId"; // Id unique pour l'image

    const iconContainer = document.createElement("div");
    iconContainer.classList.add("iconContainer");

    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can");
    trash.id = worksGallery.id; 

    iconContainer.appendChild(trash);

    galleryDiv.appendChild(imageGallery);
    galleryDiv.appendChild(iconContainer);
    galleryContent.appendChild(galleryDiv);
  });

 
  
}

premiereModale();

// Suppression d'images dans le modale
function deletePictures() {
  const trashAll = document.querySelectorAll(".fa-trash-can");
  trashAll.forEach(trash => {
    trash.addEventListener("click", (e) => {
      const token = localStorage.getItem('token');
      const id = trash.id;
      const supprMethod = {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "authorization" : token },
        
      };

      fetch("http://localhost:5678/api/works/" + id, supprMethod)
        .then((response) => {
         // return response.json();
        })
        .then((data) => {
          // Supprimer l'élément
          const galleryDiv = trash.closest(".divImagesContent");
          if (galleryDiv) {
            galleryDiv.remove();
            
          }
        });
    });
  });
}

deletePictures();


// Deuxieme modalde
function DeuxiemeModale(){
  let btnAddPhoto = document.getElementById("btnAddPhoto");
  let galleryContainer = document.querySelector(".galleryContainer");
  let pictureAddContainer = document.querySelector(".pictureAddContainer");
  let modaleTitle = document.querySelector(".modaleTitle");
  let borderBottom = document.querySelector(".borderBottom");
  let modaleContent = document.querySelector(".modaleContent");
  let croixdiv = document.querySelector(".croix");
  let arrowLeft = document.getElementById("arrowLeft");


  btnAddPhoto.addEventListener("click", () =>{
    galleryContainer.style.display = "none";
    pictureAddContainer.style.display = "flex";
    modaleTitle.textContent = "Ajout photo";
    modaleContent.style.justifyContent = "flex-start";
    modaleTitle.style.marginBottom = "40px";
    btnAddPhoto.style.display = "none";
    borderBottom.style.display = "none";
    arrowLeft.style.display = "block";
    croixdiv.style.justifyContent = "space-between";
  });

  arrowLeft.addEventListener("click", () =>{
    pictureAddContainer.style.display = "none";
    galleryContainer.style.display = "block";
    modaleTitle.textContent = "Galerie photo";
    btnAddPhoto.style.display = "block";
    borderBottom.style.display = "block";
    arrowLeft.style.display = "none";
    croixdiv.style.justifyContent = "flex-end";
  });
  
}

DeuxiemeModale();




//Ajouter des projets
async function addPhoto(event) {
  event.preventDefault();
  // validateForm();
  const isValid = await validateForm();
  if (!isValid) {
    return; 
  }
  

  const inputTitre = document.getElementById("titre").value;
  const fileInput = document.getElementById("fileInput").files[0];
  const categorySelect = document.getElementById("category").value;

  const formData = new FormData();
  formData.append('image', fileInput);
  formData.append('title', inputTitre);
  formData.append('category', categorySelect);

  const token = localStorage.getItem('token');
  const authorisation = "Bearer " + token;

  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      'Authorization': authorisation,
      'Accept': 'application/json'
    },
    body: formData
  });

  const responseBody = await response.json();
  

 
   
    
}


const formModale = document.getElementById("formModale");
formModale.addEventListener("submit", addPhoto);






//Ajouter des options de la balise Select
function selectOption(){
  
  let category = document.getElementById("category");
  
  categories.forEach(categorie =>{
    const option = document.createElement("option");
    option.value = categorie.id;
    option.textContent = categorie.name;
    category.appendChild(option);
  })
}
selectOption();



//Ajouter des images dans files
function addImages(){
  const cadreimgSelectionneImg = document.querySelector(".cadreimgSelectionne img");
  const labelFile = document.getElementById("labelFile");
  const iconFile = document.getElementById("iconFile");
  const fileP = document.getElementById("fileP");
  const cadreimgSelectionne = document.querySelector(".cadreimgSelectionne")

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    console.log(file);

    if(file){
      const reader = new FileReader();
      reader.onload = function (e){
        cadreimgSelectionneImg.src = e.target.result;
        cadreimgSelectionne.style.display = "block";
        labelFile.style.display = "none";
        iconFile.style.display = "none";
        fileP.style.display = "none";
      }
      reader.readAsDataURL(file);
    }
  });
}
addImages()


// Conditions de validation du formulaire
async function validateForm() {
  const errorMessage = document.querySelector(".errorMessage");
  const inputTitre = document.getElementById("titre");
  const fileInput = document.getElementById("fileInput");
  const btnValider = document.getElementById("btnValider");

  function showError(message) {
    errorMessage.style.display = "block";
    errorMessage.textContent = message;
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 3000);
  }

  errorMessage.style.display = "none"; // Réinitialiser les messages d'erreur

  if (!fileInput.files.length && inputTitre.value === "") {
    showError("Veuillez remplir le formulaire");
    return false;
  }

  if (!fileInput.files.length) {
    showError("Veuillez ajouter une image");
    return false;
  }

  const file = fileInput.files[0];
  if (file.size > 4 * 1024 * 1024) { 
    showError("L'image doit faire moins de 4 Mo");
    fileInput.value = ""; // Réinitialiser le champ de fichier
    return false;
  }

  if (inputTitre.value === "") {
    showError("Veuillez ajouter un titre");
    fileInput.value = "";
    return false;
  }

  btnValider.style.backgroundColor = "green";
  return true;
}



// Gestion de l'administration et de la connexion
async function adminCo() {
  let isAdmin = sessionStorage.getItem("admin");
  let adminText = document.getElementById("adminText");

  if (isAdmin === "true") {
    adminText.textContent = "Admin";
  } else {
    adminText.textContent = "";
  }

  const loginLien = document.getElementById("loginLien");
  if (localStorage.getItem("token") !== null) {
    loginLien.textContent = "Logout";
  }
}

adminCo();

























