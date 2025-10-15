export function loadAnimations() {
  console.log("🎞 Animations loaded");

  
  const sections = document.querySelectorAll("section");
  const revealSection = () => {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight - 100) {
        section.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealSection);
  revealSection(); 

  
  window.addEventListener("scroll", () => {
    const home = document.querySelector(".home");
    if (home) {
      home.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
    }
  });

  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.onload = () => {
      img.style.opacity = "1";
      img.style.transition = "opacity 0.6s ease-in";
    };
  });
}