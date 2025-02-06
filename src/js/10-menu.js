document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.querySelector("[data-menu]");
  const openMenuBtn = document.querySelector("[data-menu-open]");
  const closeMenuBtn = document.querySelector("[data-menu-close]");
  const menuLinks = document.querySelectorAll(".mobile-menu-nav-link");

  // Функція для відкриття/закриття меню
  function toggleMenu() {
    mobileMenu.classList.toggle("is-open");
    document.body.classList.toggle("no-scroll"); // Заборона прокрутки сторінки
  }

  // Відкриття меню
  openMenuBtn.addEventListener("click", toggleMenu);

  // Закриття меню
  closeMenuBtn.addEventListener("click", toggleMenu);

  // Закриття меню при кліку на будь-яке посилання
  menuLinks.forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });
});
