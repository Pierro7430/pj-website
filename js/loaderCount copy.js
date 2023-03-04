const arrayLetters = ['p', 'i', 'e', 'r', 'r', 'e', '-', 'j', 'u', 's', 't'];

// Fonction pour générer une lettre aléatoire
let pickRandomLetter = () => String.fromCharCode(0|Math.random()* 26 + 97);

// Durée minimale et maximale du délai d'attente entre chaque changement de lettre (en millisecondes)
const minDelay = 500;
const maxDelay = 1000;

// Fonction pour créer les éléments du DOM
function createDomElement() {
  // Création de la div principale du loader
  const loader = document.createElement('div');
  loader.setAttribute('id', 'loader');
  document.body.appendChild(loader);

  // Création du conteneur des lettres
  const loaderContainer = document.createElement('div');
  loaderContainer.classList.add('loader__container');
  loader.appendChild(loaderContainer);

  // Création des éléments de lettres à partir du tableau
  for (let i = 0; i < arrayLetters.length; i++) {
    const letter = document.createElement('p');
    letter.classList.add('letter');
    letter.innerHTML = arrayLetters[i]; // affichage de la lettre du tableau
    loaderContainer.appendChild(letter);
  }

  // Récupération de toutes les lettres créées
  const allLetters = document.querySelectorAll('.letter');
  
  // Tableau pour stocker la durée de l'animation de chaque lettre
  const letterDurations = new Array(allLetters.length);

  // Fonction pour changer la lettre avec une durée aléatoire
  function changeLetter(letter, index) {
    // Choix d'une lettre aléatoire différente de la lettre actuelle
    let randomLetter = pickRandomLetter();
    while (randomLetter === letter.innerHTML) {
      randomLetter = pickRandomLetter();
    }

    // Durée aléatoire de l'animation
    const randomDuration = letterDurations[index] || Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;
    if (!letterDurations[index]) {
      letterDurations[index] = randomDuration;
    }

    // Création de l'animation avec les propriétés CSS
    letter.style.transition = `transform ${randomDuration}ms linear`;
    letter.style.transform = 'translateY(-100%)';
    letter.addEventListener('transitionend', () => {
      letter.style.transition = 'none'; // Réinitialisation de l'animation
      letter.style.transform = 'translateY(100%)'; // Réinitialisation de la position de la lettre
      letter.innerHTML = randomLetter; // Affichage de la nouvelle lettre
      setTimeout(() => changeLetter(letter, index), minDelay); // Planification de la prochaine animation
    }, { once: true }); // On retire l'événement après la fin de l'animation
  }

  // Pour chaque lettre, on va planifier un changement de lettre avec une durée aléatoire
  allLetters.forEach((letter, index) => {
    // Planification du premier changement avec une durée aléatoire
    setTimeout(() => {
      changeLetter(letter, index);
    }, minDelay + index * 100); // décalage entre chaque animation pour un effet de cascade
  });
}

// Fonction d'initialisation du loader
function init() {
  createDomElement();
}


// Lancement de l'initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', init);
