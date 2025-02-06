// // Перевірка підключення Accordion
// console.log("01-header скрипт успішно підключено!");
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-desk-tabl-btn");
  const nav = document.querySelector(".header-nav");
  const burgerMenu = document.querySelector(".burger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeMenu = document.querySelector(".close-menu");
  const navLinks = document.querySelectorAll('.header-menu a');

  // Відкриття/закриття десктопної навігації
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // Закриття навігації при кліку за межами меню
  document.addEventListener("click", event => {
    if (!menuBtn.contains(event.target) && !nav.contains(event.target)) {
      nav.classList.remove("active");
    }
  });

  // Відкриття мобільного меню
  // burgerMenu.addEventListener("click", () => {
  //   mobileMenu.classList.add("active");
  // });

  // Закриття мобільного меню
  // closeMenu.addEventListener("click", () => {
  //   mobileMenu.classList.remove("active");
  // });

  // Плавний скрол
  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      window.scrollTo({ top: targetElement.offsetTop - 50, behavior: "smooth" });
      nav.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });
});
