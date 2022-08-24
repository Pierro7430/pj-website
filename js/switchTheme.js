const body = document.body;
const activeLightMode = document.querySelector("sun");
const activeDarkMode = document.querySelector("moon");
const preferenceQuery = window.matchMedia("(prefers-color-scheme: dark)");


const addLightMode = () => {
    body.classList.add("light-mode");
};

const addDarkMode = () => {
  body.classList.remove("light-mode");
};



const toggleTheme = () =>
  !body.classList.contains("light-mode") ? addLightMode() : addDarkMode();

const checkPreference = () =>
  preferenceQuery.matches ? addLightMode() : addDarkMode();

btn.addEventListener("click", toggleTheme);
preferenceQuery.addEventListener("change", checkPreference);
window.addEventListener("DOMContentLoaded", checkPreference);
// (() => checkPreference())();
