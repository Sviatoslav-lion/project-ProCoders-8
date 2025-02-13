
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const desktopMenuBtn = document.querySelector(".menu-desk-tabl-btn");
  const desktopMenu = document.querySelector(".header-menu");
  const mobileMenu = document.querySelector("[data-menu]");
  const openMenuBtn = document.querySelector("[data-menu-open]");
  const closeMenuBtn = document.querySelector("[data-menu-close]");
  const menuLinks = document.querySelectorAll(".header-menu a, .order-btn, .mobile-menu-nav-link, .mobile-order-btn");

  
  function toggleMenu(menu) {
    menu.classList.toggle("is-open"); 
    
    // Блокуємо скрол, коли хоча б одне меню відкрите
    if (mobileMenu.classList.contains("is-open")) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }
  }

  
  desktopMenuBtn?.addEventListener("click", () => toggleMenu(desktopMenu)); 
  openMenuBtn?.addEventListener("click", () => toggleMenu(mobileMenu));
  closeMenuBtn?.addEventListener("click", () => toggleMenu(mobileMenu));
  
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }

      
      if (mobileMenu.classList.contains("is-open")) {
        toggleMenu(mobileMenu);
      } else if (desktopMenu.classList.contains("is-open")) {
        toggleMenu(desktopMenu);
      }
    });
  });

  // Додаємо обробник події на кліки по документу для згортання меню при натисканні поза межами меню
  document.addEventListener("click", (e) => {
    // Перевіряємо, чи не був клік на відкритому меню або кнопці
    if (
      !desktopMenu.contains(e.target) &&
      !desktopMenuBtn.contains(e.target) &&
      !mobileMenu.contains(e.target) &&
      !openMenuBtn.contains(e.target)
    ) {
      // Якщо клік був поза межами, закриваємо відкриті меню
      if (desktopMenu.classList.contains("is-open")) {
        toggleMenu(desktopMenu);
      }
      if (mobileMenu.classList.contains("is-open")) {
        toggleMenu(mobileMenu);
      }
    }
  });
});
