document.addEventListener("DOMContentLoaded", renderReviews);
async function fetchReviews() {
  try {
    const response = await fetch(
      "https://portfolio-js.b.goit.study/api/reviews"
    );
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched Reviews:", data);
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format. Expected an array.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    showErrorMessage();
    return [];
  }
}
async function renderReviews() {
  const reviewsContainer = document.querySelector(".reviews-swiper-wrapper");
  if (!reviewsContainer) {
    console.error("Reviews container not found!");
    return;
  }

  const reviews = await fetchReviews();

  if (reviews.length === 0) {
    reviewsContainer.innerHTML =
      '<li class="swiper-slide not-found">Not found</li>';
    return;
  }
  reviewsContainer.innerHTML = reviews
    .map(
      (review) => `
      <li class="swiper-slide" role="listitem">
        <div class="review-card">
          <img src="${review.avatar_url}" alt="${review.author}" class="review-avatar">
          <h3>${review.author}</h3>
          <p>${review.review}</p>
        </div>
      </li>
    `
    )
    .join("");

  setTimeout(() => {
    initSwiper();
    enableExpandReviewText();
  }, 150);

  function enableExpandReviewText() {
    document.querySelectorAll('.review-card p').forEach(paragraph => {
        paragraph.addEventListener('click', function () {
            this.classList.toggle('expanded');
        });
    });
}
}
function initSwiper() {
  console.log("Initializing Swiper...");

  const swiper = new Swiper(".reviews-swiper", {
    slidesPerView: 1, // Мобільний
    spaceBetween: 20,
    loop: false,
    speed: 800,
    navigation: {
      nextEl: ".next-button-js",
      prevEl: ".prev-button-js",
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    grabCursor: true,
    simulateTouch: true,
    observer: true,
    observeParents: true,
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1440: { slidesPerView: 4 },
    },
    on: {
      init: function () {
        console.log("Swiper initialized!");
        updateNavigationButtons(this);
      },
      slideChange: function () {
        updateNavigationButtons(this);
      },
      reachEnd: function () { // 🚀 Додаємо блокування кнопки "Вперед" 
        disableButton(".next-button-js");
      },
      reachBeginning: function () { // 🚀 Додаємо блокування кнопки "Назад"
        disableButton(".prev-button-js");
      },
    },
  });
  //   Чому ми викликаємо swiper.update(); і updateNavigationButtons(swiper); разом?
  // Коли ми динамічно додаємо слайди, Swiper не знає, що вони зявилися.
  // Тому потрібно оновити Swiper і одразу оновити кнопки навігації.
  setTimeout(() => {
    swiper.update();
    updateNavigationButtons(swiper);
  }, 200);
}
// Що робить updateNavigationButtons(swiper);?
// Знаходить кнопки "Назад" і "Вперед" у DOM.
// Перевіряє, чи Swiper на першому (swiper.isBeginning) або останньому (swiper.isEnd) слайді.
// Вмикає/вимикає кнопки (disabled = true).
// Додає або прибирає CSS-клас disabled для зміни стилю.
// 📌 Без updateNavigationButtons(swiper); кнопки можуть бути активні, навіть якщо ти на останньому слайді!
function updateNavigationButtons(swiper) {
  if (!swiper || !swiper.navigation) {
    console.error("Swiper navigation not initialized!");
    return;
  }

  const prevButton = document.querySelector(".prev-button-js");
  const nextButton = document.querySelector(".next-button-js");

  if (!prevButton || !nextButton) {
    console.error("Navigation buttons not found!");
    return;
  }
  setTimeout(() => {
    prevButton.disabled = swiper.isBeginning;
    nextButton.disabled = swiper.isEnd;

    prevButton.classList.toggle("disabled", swiper.isBeginning);
    nextButton.classList.toggle("disabled", swiper.isEnd);
  }, 100); 
}
function disableButton(selector) {
  const button = document.querySelector(selector);
  if (button) {
    button.disabled = true;
    button.classList.add("disabled");
  }
}