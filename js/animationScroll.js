const navLinks = [...document.querySelectorAll("nav a")];
const sections = [...document.querySelectorAll("section")];

let sectionPositions;

function positionCalculation() {
  sectionPositions = sections.map(section => section.offsetTop)
};

positionCalculation();

navLinks.forEach(link => link.addEventListener("click", addScrollSmooth));


function addScrollSmooth(e){
    const linkIndex = navLinks.indexOf(e.target);
    window.scrollTo({
        top: sectionPositions[linkIndex],
        behavior: "smooth"
    });
};

// window.onscroll = function(e) {
//     console.clear();
  
//     if(this.oldScroll > this.scrollY){
//       console.log('Scrolling up');
//       window.scrollTo({
//         top: sectionPositions[1],
//         behavior: "smooth"
//     });
//     }
//     else{
//       console.log('Scrolling down');
//       window.scrollTo({
//         top: 1024,
//         behavior: "smooth"
//     });
//     }
//     this.oldScroll = this.scrollY;
// }

window.addEventListener("resize", positionCalculation);

