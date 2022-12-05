const body = document.body;



// My button to switch Mode
const switchMode = document.querySelector('#theme-toggle');

// My button to switch Dark-Mode
const preferenceQuery = window.matchMedia('(prefers-color-scheme: light)');

const currentTheme = localStorage.getItem('theme');


const addLightMode = () => {
    body.classList.add('light-mode');
    let theme = 'light';
    localStorage.setItem('theme', theme);
    // const eventSwitchTheme = new CustomEvent('switchTheme', {theme});
};

export const addDarkMode = () => {
    body.classList.remove('light-mode');
    let theme = 'dark';
    localStorage.setItem('theme', theme);
    // const eventSwitchTheme = new CustomEvent('switchTheme', {theme});
};

const toggleTheme = () => {
    !body.classList.contains('light-mode') ? addLightMode() : addDarkMode();
};
    

const checkPreferenceOS = () => {
    preferenceQuery.matches ? addLightMode() : addDarkMode();
};

const checkLocalStorage = () => {
    if (currentTheme == 'light') {
        addLightMode();
    } else {
        addDarkMode();
    }
};

function init() {
    if (switchMode) {
        switchMode.addEventListener('click', toggleTheme);
    }
    
    preferenceQuery.addEventListener('change', checkPreferenceOS);
    window.addEventListener('DOMContentLoaded', checkPreferenceOS);
    window.addEventListener('DOMContentLoaded', checkLocalStorage);
}

init();