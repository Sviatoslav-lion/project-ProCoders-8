document.addEventListener("DOMContentLoaded", function() {
  const coverSection = document.querySelector('.covers');
  const coversPictures = document.querySelectorAll('.covers-picture');

  if (!coverSection || coversPictures.length === 0) return; // Проверка наличия элементов

  const options = {
    root: null, // следим относительно вьюпорта
    rootMargin: '0px',
    threshold: 0.5 // активация, когда 50% элемента видно
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        coversPictures.forEach(el => {
          el.classList.add('covers-animation'); // Добавляем класс анимации
        });
        observer.disconnect(); // Отключаем наблюдатель после добавления анимации
      }
    });
  }, options);

  observer.observe(coverSection);
});