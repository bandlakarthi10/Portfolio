document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll("main section");

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      // Get target section ID from href
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      // Hide all sections first
      sections.forEach(section => {
        section.classList.add("hidden");
        section.classList.remove("visible");
      });

      // Show the clicked section
      targetSection.classList.remove("hidden");
      targetSection.classList.add("visible");

      // Smooth scroll into view
      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });
});