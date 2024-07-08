const gallery = document.querySelector('.gallery');
let worksData = [];

async function fetchAndDisplayWorks() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    worksData = await response.json();
    displayWorks(worksData);
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'API :', error);
  }
}

function displayWorks(works) {
  
  gallery.innerHTML = '';

  // Parcourir chaque œuvre et créer les éléments correspondants
  works.forEach(work => {
    // Créer les éléments
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

   
    img.src = work.imageUrl;
    figcaption.textContent = work.title;

    // Ajouter les éléments au figure
    figure.appendChild(img);
    figure.appendChild(figcaption);

    // Ajouter le figure à la galerie
    gallery.appendChild(figure);
  });
}

fetchAndDisplayWorks();


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

  if(categories && categories.length > 0){
    

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.innerText = category.name;
      button.id = category.id;
      button.classList.add("filter-button");
      filterContainer.appendChild(button);
    })

    
  }
}

filterData(categories);


const buttonAll = document.getElementById("Tous");




buttonAll.addEventListener("click", () => {
  fetchAndDisplayWorks();
})


// categories = api/categories  
// category = chaque éléménts dans l'api/categories

// worksData = api/works
// work = chaque éléments de la galerie


categories.forEach((category) => {
  const button = document.getElementById(category.id);

  button.addEventListener("click", () => {
    const filteredWorks = worksData.filter((work) => {

      return work.categoryId === category.id;

    });
    displayWorks(filteredWorks);
  });
});


// aller vers la page login

async function loginLien(){
  const loginLien = document.getElementById("loginLien");
  loginLien.addEventListener("click", () =>{
    window.location.href = "login/connexion.html"
  });
  
}

loginLien();



    
   

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
      const id = trash.id;
      const supprMethod = {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4" },
        
      };

      fetch("http://localhost:5678/api/works/" + id, supprMethod)
        .then((response) => {
          return response.json();
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
    btnAddPhoto.style.display = "block";
    borderBottom.style.display = "block";
    arrowLeft.style.display = "none";
    croixdiv.style.justifyContent = "flex-end";
  });
  
}

DeuxiemeModale();



async function adminCo() {
  let isAdmin = window.sessionStorage.admin;
  let loginLien = document.getElementById("loginLien");
 

  if (isAdmin) {
          
          let adminText = document.getElementById("adminText");
          adminText.textContent = "Admin";
          loginLien.textContent = "Logout";
         
}
}


adminCo();



//Ajouter des projets
async function addPhoto(event) {
  event.preventDefault();
  validateForm();
  
  const inputTitre = document.getElementById("titre").value;
  const fileInput = document.getElementById("fileInput").files[0];
  const categorySelect = document.getElementById("category").value;

  const formData = new FormData();
  formData.append('image', fileInput);
  formData.append('title', inputTitre);
  formData.append('category', categorySelect);

  const token = localStorage.getItem('token');
  const authorisation = "Bearer " + token;

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        'Authorization': authorisation,
        'Accept': 'application/json'
      },
      body: formData
    });

    const responseBody = await response.json();
    console.log('Corps de la réponse:', responseBody);

    if (response.ok) {
      console.log('Ajout réussi:', responseBody);
      await fetchAndDisplayWorks(); // Rafraîchir les données après l'ajout
      premiereModale(); 
      formModale.reset();
    } else {
      console.error(`Erreur lors de l'ajout: ${response.status}`, responseBody);
    }
  } catch (error) {
    console.error('Erreur lors de la requête:', error);
  }
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

async function validateForm(){
  
  const errorMessage = document.querySelector(".errorMessage");
  const inputTitre = document.getElementById("titre");
  const fileInput = document.getElementById("fileInput");

  if(fileInput.value === "" && inputTitre.value === ""){
    errorMessage.style.display = "block";
    errorMessage.textContent = "Veuillez remplir le formulaire";
    return 
  }

  if(fileInput.value === ""){
    errorMessage.style.display = "block";
    errorMessage.textContent = "Veuillez ajouter une image"
    return 
  }

  if(inputTitre.value === ""){
    errorMessage.style.display = "block";
    errorMessage.textContent = "Veuillez ajouter un titre";
    return 
  }

  if(inputTitre.value !== "" && fileInput.value !== ""){
      errorMessage.style.display = "none";
      const btnValider = document.getElementById("btnValider");
      console.log("bonjouuuur");
      btnValider.style.backgroundColor = "green";
    return
  }

}



























