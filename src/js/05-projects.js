document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: false,
    navigation: {
      nextEl: '.next-button-js',
      prevEl: '.prev-button-js',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    grabCursor: true, // Adds a 'hand' when dragging
    simulateTouch: true, // Allows user to swipe
    on: {
      slideChange: () => updateNavigationButtons(swiper),
    },
  });
  function updateNavigationButtons(swiper) {
    const prevButton = document.querySelector('.prev-button-js');
    const nextButton = document.querySelector('.next-button-js');

    prevButton.disabled = swiper.isBeginning;
    nextButton.disabled = swiper.isEnd;

    prevButton.classList.toggle('disabled', swiper.isBeginning);
    nextButton.classList.toggle('disabled', swiper.isEnd);
  }
  updateNavigationButtons(swiper);
});
