const menuButton = document.querySelector(".menu-desk-tabl-btn");
const menuList = document.querySelector(".header-menu");

menuButton.addEventListener("click", () => {
  menuList.classList.toggle("is-open");
});
document.querySelectorAll('.header-menu a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // Забороняємо стандартну поведінку посилання

    const targetId = this.getAttribute('href'); // Отримуємо значення href
    const targetSection = document.querySelector(targetId); // Знаходимо відповідну секцію

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' }); // Плавно скролимо
    }
  });
});

