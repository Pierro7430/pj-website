// query selector

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav__list__link');

let activeSection;



// helper functions

//ajoute la classe active au link à la section détectée comme intersection par l'observeur
const activeSectionHandler = (currentSectionId) => {{
    navLinks.forEach(link => {
        if(link.dataset.section === currentSectionId) {
            link.classList.add('active');
            return;
        }
        link.classList.remove('active');
    })

}};

// set active Section
const setActiveSection = (section)  => {
    activeSection = section;
}

const updateUrl = (newSection)  => {
    const url = location.href.split("#")[0];
    const newSectionId = newSection.id;
    const newUrl = url + '#' + newSectionId;
    location.href = newUrl;
}


const showPreviousSection = (section)  => {
    const previousSection = activeSection.previousElementSibling;
    if (previousSection == null) {
        return;
    }
    previousSection.scrollIntoView();
    updateUrl(previousSection);
}

const showNextSection = (section)  => {
    const nextSection = activeSection.nextElementSibling;
    if (nextSection == null) {
        return;
    }
    nextSection.scrollIntoView();
    updateUrl(nextSection);
}


// obervation des intersections des sections
const sectionWatcherCallBack = (section, sectionWatcher) => {
    section.forEach(section => {
        if(!section.isIntersecting) {
            return;
        };
        activeSectionHandler(section.target.id);
        setActiveSection(section.target);
    })  
};

const sectionWatcherOptions =  {
    threshold: 0.6
};

const sectionWatcher = new IntersectionObserver(sectionWatcherCallBack, sectionWatcherOptions)

sections.forEach(section => {
    sectionWatcher.observe(section);
});


//event handler for keyboard

window.addEventListener('keydown', (key) => {
    if(key.code === 'ArrowUp' || key.code === 'PageUp') {
        key.preventDefault();
        showPreviousSection();
    }
    if(key.code === 'ArrowDown' || key.code === 'PageDown' || key.code === 'Space') {
        key.preventDefault();
        showNextSection();
    }
    return;
});


window.addEventListener('wheel', function(e)  {
    if (e.deltaY < 0) {
        e.preventDefault();
        e.stopPropagation();
        showPreviousSection();
    }
    else {   
        e.preventDefault();
        e.stopPropagation();
        showNextSection();
    }
}, {passive:false});


    

    

// window.addEventListener("resize", positionCalculation);
