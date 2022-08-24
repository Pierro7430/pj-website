import './style.scss';
import Experience from './Experience/Experience.js';
// import animation from './js/animationScroll.js';


// const experience = new Experience(document.querySelector(".experience-canvas"));




const body = document.body;
const activeLightMode = document.querySelector("#sun");
const activeDarkMode = document.querySelector("#moon");

const preferenceQuery = window.matchMedia("(prefers-color-scheme: light)");


const addLightMode = () => {
    body.classList.add("light-mode");
    activeLightMode.disabled = true;
    activeDarkMode.disabled = false;
};

const addDarkMode = () => {
    body.classList.remove("light-mode");
    activeDarkMode.disabled = true;
    activeLightMode.disabled = false;
};



const toggleTheme = () =>
    !body.classList.contains("light-mode") ? addLightMode() : addDarkMode();

const checkPreference = () =>
    preferenceQuery.matches ? addLightMode() : addDarkMode();

activeLightMode.addEventListener("click", toggleTheme);
activeDarkMode.addEventListener("click", toggleTheme);
preferenceQuery.addEventListener("change", checkPreference);
window.addEventListener("DOMContentLoaded", checkPreference);














const navLinks = [...document.querySelectorAll("nav_link")]
const sections = [...document.querySelectorAll("section")]

navLinks.forEach(link => link.addEventListener("click", addScrollSmooth))

function addScrollSmooth(e){
  const linkIndex = navLinks.indexOf(e.target);
  window.scrollTo({
    top: sections[linkIndex].offsetTop,
    behavior: "smooth"
  })
}
