// query selector

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

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

const showPreviousSection = (section)  => {
    const previousSection = activeSection.previousElementSibling;
    if (previousSection == null) {
        return;
    }
    previousSection.scrollIntoView();
}

const showNextSection = (section)  => {
    const nextSection = activeSection.nextElementSibling;
    if (nextSection == null) {
        return;
    }
    nextSection.scrollIntoView();
}

const keyEventHandler = (keycode) => {
    switch (keycode) {
        case 'ArrowUp':
            showPreviousSection();
            break;
        case 'ArrowDown':
            showNextSection();
            break;
    }
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
    if(key.code === 'ArrowUp') {
        key.preventDefault();
        keyEventHandler(key.code);
    }
    if(key.code === 'ArrowDown') {
        key.preventDefault();
        keyEventHandler(key.code);
    }
    return;
});

const selectPreviousLink = (linkActiveId) => {
    navLinks.forEach(link => {        
        if(link.id === linkActiveId) {
            let previousLinkActiveId = link.previousElementSibling;
            if (previousLinkActiveId == null) {
                return;
            } 
            let superLink = previousLinkActiveId.id;
            console.log(superLink);
            document.getElementById(superLink).click();
            
        }
    })
}

const selectNextLink = (linkActiveId) => {
    navLinks.forEach(link => {        
        if(link.id === linkActiveId) {
            let nextLinkActiveId = link.nextElementSibling;
            console.log(nextLinkActiveId);
            if (nextLinkActiveId == null) {
                return;
            }
            let superLink = nextLinkActiveId.id;
            console.log(superLink);
            document.getElementById(superLink).click();


        }
    })
}

window.addEventListener('wheel', function(e)  {
    let linkActive = document.getElementsByClassName('active');
    let linkActiveId = linkActive[0].id;
    

    if (e.deltaY < 0) {
        console.log('up');
        selectPreviousLink(linkActiveId);
    }
    else {
        console.log('down');
        selectNextLink(linkActiveId)
    }
});


    

    


