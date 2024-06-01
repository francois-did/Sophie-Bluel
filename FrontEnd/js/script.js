// Récupère l'élément div avec la classe "gallery"
const gallery = document.querySelector('.gallery');

// Fonction asynchrone pour récupérer les données de l'API et les afficher
async function fetchAndDisplayWorks() {
  try {
    // Récupère les données de l'API
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();
    
    // Boucle à travers les données pour créer et ajouter les balises figure
    data.forEach(work => {
      // Crée un élément figure
      const figure = document.createElement('figure');

      // Crée un élément img
      const img = document.createElement('img');
      img.src = work.imageUrl; // Définit l'URL de l'image
      img.alt = work.title; // Définit l'attribut alt de l'image

      // Crée un élément figcaption
      const figcaption = document.createElement('figcaption');
      figcaption.textContent = work.title; // Définit le texte du figcaption

      // Ajoute l'image et le figcaption à l'élément figure
      figure.appendChild(img);
      figure.appendChild(figcaption);

      // Ajoute l'élément figure à la galerie
      gallery.appendChild(figure);
    });
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des données de l\'API :', error);
  }
}

// Appelle la fonction pour récupérer et afficher les travaux
fetchAndDisplayWorks();


//BOUTTONS FILTRES DU PROJET

let filterProject = document.querySelector(".filterProject");

let filterNames = ["Tous", "Objets", "Appartements", "Hotels & restaurants"];

filterNames.forEach(names => {
  let filters = document.createElement("button");
  filters.innerText = names;
  filters.className = "filter-button";// classe css des filtres

  filterProject.appendChild(filters);
});

