// Fonction pour générer une lettre aléatoire
let pickRandomLetter = () => String.fromCharCode(0|Math.random()* 26 + 97);

// Tableau de lettres à afficher
const arrayLetters = ['p', 'i', 'e', 'r', 'r', 'e', '-', 'j', 'u', 's', 't']

// Durée minimale et maximale du délai d'attente entre chaque changement de lettre (en millisecondes)
const minDelay = 500;
const maxDelay = 1500;

// Fonction pour choisir une durée aléatoire entre minDelay et maxDelay
const randomDelay = () => Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;

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
    for(let i = 0; i < arrayLetters.length; i++) {
        const letter = document.createElement('p')
        letter.classList.add('letter');
        letter.innerHTML = 1;
        loaderContainer.appendChild(letter);  
    }

    // Récupération de toutes les lettres créées
    const allLetters = document.querySelectorAll('.letter');
    
    // Pour chaque lettre, on va planifier un changement de lettre avec une durée aléatoire
    allLetters.forEach(letter => {
        setInterval( function() {
            
            let randomLetter = pickRandomLetter();
        
            while (randomLetter === letter.innerHTML) {
                randomLetter = pickRandomLetter();
            } 
        
            letter.innerHTML = randomLetter;
            letter.classList.remove('letter--anim');
        
            setTimeout(() => {
                letter.classList.add('letter--anim');
            }, 100);
          
        }, 1000);
    });
    
}

function init() {
    
    createDomElement();
}

init();