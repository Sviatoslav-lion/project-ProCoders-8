document.addEventListener('DOMContentLoaded', () => {
  const prevButtonPrj = document.querySelector('.prev-button-js-prj');
  const nextButtonPrj = document.querySelector('.next-button-js-prj');
  const swiperContainerPrj = document.querySelector('.swiper-prj');

  if (!prevButtonPrj || !nextButtonPrj)
    return console.error('Navigation buttons not found');

  if (!swiperContainerPrj) {
    console.error('Swiper container not found');
    return;
  }

  const swiperPrj = new Swiper('.swiper-prj', {
    slidesPerView: 1,
    loop: false,
    spaceBetween: 30,
    speed: 800,
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
      init(swiperPrj) {
        updateNavigationButtons(swiperPrj, prevButtonPrj, nextButtonPrj);
      },
      slideChange(swiperPrj) {
        updateNavigationButtons(swiperPrj, prevButtonPrj, nextButtonPrj);
      },
    },
  });
  function updateNavigationButtons(swiperPrj, prevButtonPrj, nextButtonPrj) {
    if (!swiperPrj || !prevButtonPrj || !nextButtonPrj) return;
    // requestAnimationFrame is a built-in function provided by the browser (Web API).
    // It is part of the Window API and is designed specifically for
    // handling animations and UI updates efficiently.
    requestAnimationFrame(() => {
      const { isBeginning, isEnd } = swiperPrj;

      prevButtonPrj.disabled = isBeginning;
      nextButtonPrj.disabled = isEnd;

      prevButtonPrj.classList.toggle('disabled', isBeginning);
      nextButtonPrj.classList.toggle('disabled', isEnd);

      prevButtonPrj.setAttribute('aria-disabled', isBeginning);
      nextButtonPrj.setAttribute('aria-disabled', isEnd);
    });
  }
});
