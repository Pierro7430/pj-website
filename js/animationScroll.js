const navLinks = [...document.querySelectorAll("nav a")]
const sections = [...document.querySelectorAll("section")]

navLinks.forEach(link => link.addEventListener("click", addScrollSmooth))

function addScrollSmooth(e){
  const linkIndex = navLinks.indexOf(e.target);
  window.scrollTo({
    top: sections[linkIndex].offsetTop,
    behavior: "smooth"
  })
}