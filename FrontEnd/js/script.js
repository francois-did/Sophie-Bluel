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
  // Vider la galerie avant d'ajouter les nouvelles œuvres
  gallery.innerHTML = '';

  // Parcourir chaque œuvre et créer les éléments correspondants
  works.forEach(work => {
    // Créer les éléments
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    // Définir les attributs et le contenu
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

const filterNames = ["Tous", "Objets", "Appartements", "Hotels & restaurants"];
const categoryIds = ["all", 1, 2, 3];
const filterProject = document.querySelector(".filterProject");

filterNames.forEach((name, index) => {
  const button = document.createElement("button");
  button.innerText = name;
  button.className = "filter-button";
  button.id = `filter-${categoryIds[index]}`;
  filterProject.appendChild(button);

  button.addEventListener("click", () => {
    const filteredWorks = categoryIds[index] === "all" ? worksData : worksData.filter(work => work.categoryId === categoryIds[index]);
    displayWorks(filteredWorks);
  });
});
