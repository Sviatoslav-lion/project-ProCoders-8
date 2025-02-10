document.addEventListener('DOMContentLoaded', () => {
  const prevButton = document.querySelector('.prev-button-js-prj');
  const nextButton = document.querySelector('.next-button-js-prj');
  const swiperContainer = document.querySelector('.swiper-prj');

  if (!prevButton || !nextButton)
    return console.error('Navigation buttons not found');

  if (!swiperContainer) {
    console.error('Swiper container not found');
    return;
  }

  const swiper = new Swiper('.swiper-prj', {
    slidesPerView: 1,
    loop: false,
    navigation: {
      nextEl: '.next-button-js-prj',
      prevEl: '.prev-button-js-prj',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    grabCursor: true,
    simulateTouch: true,
    on: {
      init(swiper) {
        updateNavigationButtons(swiper, prevButton, nextButton);
      },
      slideChange(swiper) {
        updateNavigationButtons(swiper, prevButton, nextButton);
      },
    },
  });
  function updateNavigationButtons(swiper, prevButton, nextButton) {
    if (!swiper || !prevButton || !nextButton) return;
    // requestAnimationFrame is a built-in function provided by the browser (Web API).
    // It is part of the Window API and is designed specifically for
    // handling animations and UI updates efficiently.
    requestAnimationFrame(() => {
      const { isBeginning, isEnd } = swiper;

      prevButton.disabled = isBeginning;
      nextButton.disabled = isEnd;

      prevButton.classList.toggle('disabled', isBeginning);
      nextButton.classList.toggle('disabled', isEnd);

      prevButton.setAttribute('aria-disabled', isBeginning);
      nextButton.setAttribute('aria-disabled', isEnd);
    });
  }
});
