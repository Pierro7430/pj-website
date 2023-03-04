const arrayLetters = ['p', 'i', 'e', 'r', 'r', 'e', '-', 'j', 'u', 's', 't'];

// Fonction pour générer une lettre aléatoire
let pickRandomLetter = () => String.fromCharCode(0|Math.random()* 26 + 97);

// Durée totale de l'animation (en millisecondes)
const totalDuration = 10000;

// Fonction d'interpolation pour ajuster la durée de l'animation en fonction du temps écoulé
function interpolateDuration(elapsedTime) {
  const progress = elapsedTime / totalDuration;
  return Math.floor(500 / (1 - progress));
}

// Fonction d'interpolation pour ajuster la durée de l'animation en fonction du temps restant
function interpolateReverseDuration(remainingTime) {
  const progress = remainingTime / totalDuration;
  return Math.floor(500 / progress);
}

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

  // Fonction pour changer la lettre avec une durée aléatoire ajustée
  function changeLetter(letter, index, elapsedTime) {
    // Choix d'une lettre aléatoire différente de la lettre actuelle
    let randomLetter = pickRandomLetter();
    while (randomLetter === letter.innerHTML) {
      randomLetter = pickRandomLetter();
    }

    // Durée de l'animation ajustée en fonction du temps écoulé
    const duration = interpolateDuration(elapsedTime);

    // Création de l'animation avec les propriétés CSS
    letter.style.transition = `transform ${duration}ms linear`;
    letter.style.transform = 'translateY(-100%)';
    letter.addEventListener('transitionend', () => {
      letter.style.transition = 'none'; // Réinitialisation de l'animation
      letter.style.transform = 'translateY(100%)'; // Réinitialisation de la position de la lettre
      letter.innerHTML = randomLetter;
      setTimeout(() => changeLetter(letter, index, elapsedTime + duration), interpolateDuration(elapsedTime)); // Planification de la prochaine animation avec une durée ajustée
    }, { once: true }); // On retire l'événement après la fin de l'animation
    }

    // Pour chaque lettre, on va planifier un changement de lettre avec une durée ajustée en fonction du temps écoulé
    allLetters.forEach((letter, index) => {
        // Planification du premier changement avec une durée ajustée
        setTimeout(() => {
            changeLetter(letter, index, 0);
        }, interpolateDuration(0) + index * 100); // décalage entre chaque animation pour un effet de cascade
    });

    // Fonction pour ajuster la durée de l'animation des lettres en fonction du temps restant
    function adjustDurations(remainingTime) {
        allLetters.forEach((letter, index) => {
            const duration = interpolateReverseDuration(remainingTime);
            letter.style.transition = transform ${duration}ms linear;
        });
    }

    // Planification de la fonction d'ajustement de la durée de l'animation des lettres en fonction du temps restant
    setTimeout(() => {
        let remainingTime = totalDuration - minDelay;
        adjustDurations(remainingTime);
        const durationInterval = setInterval(() => {
            remainingTime -= minDelay;
            adjustDurations(remainingTime);
            if (remainingTime <= 0) {
                clearInterval(durationInterval);
            }
        }, minDelay);
    }, totalDuration - minDelay);
}

    // Fonction d'initialisation du loader
    function init() {
    createDomElement();
    }

    // Lancement de l'initialisation au chargement de la page
    document.addEventListener('DOMContentLoaded', init);