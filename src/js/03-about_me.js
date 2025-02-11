document.addEventListener('DOMContentLoaded', function () {
  const aboutItems = document.querySelectorAll('.accordion-item');

  aboutItems.forEach((item, index) => {
    const aboutmeHeader = item.querySelector('.accordion-header');
    const aboutmeIcon = item.querySelector('.abme');
    const aboutmeContent = item.querySelector('.accordion-content');

    if (index === 0) {
      // Перший елемент залишаємо відкритим
      aboutmeContent.style.display = 'block';
      aboutmeIcon.style.transform = 'rotate(180deg)';
      aboutmeHeader.classList.add('active');
    } else {
      // Інші приховуємо
      aboutmeContent.style.display = 'none';
      aboutmeIcon.style.transform = 'rotate(0deg)';
    }

    aboutmeHeader.addEventListener('click', function () {
      //item.classList.toggle("open");                      // відкриваємо прихований вміст елементу
      const isOpen = aboutmeContent.style.display === 'block'; // якщо відкрили, тоді присвоємо змінній значення видимості
      aboutmeContent.style.display = isOpen ? 'none' : 'block';
      aboutmeHeader.classList.toggle('active', !isOpen);
      aboutmeIcon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  });
});
//
//swiper
document.addEventListener('DOMContentLoaded', () => {
  const skillsSwiper = new Swiper('.swiper-skills', {
    slidesPerView: 2, // Два кружечки на екрані
    spaceBetween: 0,
    loopedSlides: 6, // Дає змогу безперервно циклічно скролити всі кружечки
    loop: true, // Безкінечний скролінг
    slidesPerGroup: 1,

    slideNextClass: 'swiper-slide-next',
    speed: 400,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    simulateTouch: true, // Дозволяє свайпати
    breakpoints: {
      768: {
        slidesPerView: 3, // Чотири елементи на планшетах
        slidesPerGroup: 1,
      },
      1440: {
        slidesPerView: 6, // Всі 6 кружечків на десктопі
        slidesPerGroup: 1,
        loopedSlides: 6, // Дає змогу безперервно циклічно скролити всі кружечки
      },
    },
  });

  const skillsSliderButton = document.querySelector('.slider-button-abtme');
  if (skillsSliderButton) {
    skillsSliderButton.addEventListener('click', () => {
      skillsSwiper.slideNext(); // Завжди переміщує слайдер вперед
    });
  }
});
