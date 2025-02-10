document.addEventListener('DOMContentLoaded', () => {
  const prevButton = document.querySelector('.prev-button-js');
  const nextButton = document.querySelector('.next-button-js');
  const swiperContainer = document.querySelector('.swiper');

  if (!prevButton || !nextButton)
    return console.error('Navigation buttons not found');

  if (!swiperContainer) {
    console.error('Swiper container not found');
    return;
  }

  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    loop: false,
    navigation: {
      nextEl: '.next-button-js',
      prevEl: '.prev-button-js',
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
