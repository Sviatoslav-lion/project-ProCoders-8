async function fetchReviews() {
  try {
    const response = await fetch('https://portfolio-js.b.goit.study/api/reviews');
    const data = await response.json();
    console.log("Fetched Reviews:", data);

    if (!Array.isArray(data)) {
      console.error("Expected an array but got:", data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

async function renderReviews() {
  const reviewsContainer = document.querySelector('.reviews-swiper-wrapper');

  if (!reviewsContainer) {
    console.error("Reviews container not found!");
    return;
  }

  const reviews = await fetchReviews();

  if (!reviews || reviews.length === 0) {
    reviewsContainer.innerHTML = '<div class="reviews-swiper-slide not-found">No reviews found.</div>';
    return;
  }

  reviewsContainer.innerHTML = reviews.map(review => `
    <div class="reviews-swiper-slide">
        <div class="review-card">
            <img src="${review.avatar_url}" alt="${review.author}" class="review-avatar">
            <h3>${review.author}</h3>
            <p>${review.review}</p>
        </div>
    </div>
  `).join("");

  setTimeout(() => initSwiper(), 100);
}

function initSwiper() {
  console.log("Initializing Swiper...");

  const swiperContainer = document.querySelector('.reviews-swiper');
  if (!swiperContainer) {
    console.error("Swiper container not found!");
    return;
  }

  const prevButton = document.querySelector('.prev-button-js');
  const nextButton = document.querySelector('.next-button-js');

  if (!prevButton || !nextButton) {
    console.error("Navigation buttons not found!");
    return;
  }

  const swiper = new Swiper('.reviews-swiper', {
    slidesPerView: 4, 
    spaceBetween: 20,
    loop: true, 
    rtl: true, 
    speed: 800, 
    autoplay: {
      delay: 2000, 
      disableOnInteraction: false, 
    },
    navigation: {
      nextEl: '.prev-button-js', 
      prevEl: '.next-button-js',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    grabCursor: true,
    simulateTouch: true,
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1440: { slidesPerView: 4 }
    },
    on: {
      init: function () {
        console.log("Swiper initialized!");
        updateNavigationButtons(this);
      },
      slideChange: function () {
        updateNavigationButtons(this);
      },
    },
  });

  // Додаємо затримку перед оновленням Swiper
  setTimeout(() => {
    swiper.update();
    updateNavigationButtons(swiper);
  }, 500);
}


function updateNavigationButtons(swiper) {
  const prevButton = document.querySelector('.prev-button-js');
  const nextButton = document.querySelector('.next-button-js');

  if (!prevButton || !nextButton) {
    console.error("Navigation buttons not found!");
    return;
  }

  prevButton.disabled = swiper.isBeginning;
  nextButton.disabled = swiper.isEnd;

  prevButton.classList.toggle('disabled', swiper.isBeginning);
  nextButton.classList.toggle('disabled', swiper.isEnd);
}

document.addEventListener('DOMContentLoaded', renderReviews);
