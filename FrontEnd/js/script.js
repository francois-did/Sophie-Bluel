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
  gallery.innerHTML = works.map(work => `
    <figure>
      <img src="${work.imageUrl}" alt="${work.title}" />
      <figcaption>${work.title}</figcaption>
    </figure>
  `).join('');
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
