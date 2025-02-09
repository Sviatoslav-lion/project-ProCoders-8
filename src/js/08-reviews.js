
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


async function fetchReviews() {
    try {
        const response = await fetch('https://portfolio-js.b.goit.study/api/reviews');
        const data = await response.json();
        console.log("API Response:", data); 

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
    const reviewsContainer = document.querySelector('.swiper-wrapper');
    const reviews = await fetchReviews();

    if (!reviews || reviews.length === 0) {
        reviewsContainer.innerHTML = '<div class="swiper-slide not-found">Not found</div>';
        return;
    }

    reviewsContainer.innerHTML = reviews.map(review => `
        <div class="swiper-slide">
            <div class="review-card">
                <img src="${review.avatar_url}" alt="${review.author}" class="review-avatar">
                <h3>${review.author}</h3>
                <p>${review.review}</p>
            </div>
        </div>
    `).join("");


    initSwiper();
}


function initSwiper() {
    const swiper = new Swiper('.swiper', {
        loop: false,
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        on: {
            init: function () {
                toggleNavButtons(this);
            },
            slideChange: function () {
                toggleNavButtons(this);
            }
        }
    });
}


function toggleNavButtons(swiper) {
    const prevButton = document.querySelector('.swiper-button-prev');
    const nextButton = document.querySelector('.swiper-button-next');

    if (swiper.isBeginning) {
        prevButton.classList.add('disabled');
    } else {
        prevButton.classList.remove('disabled');
    }

    if (swiper.isEnd) {
        nextButton.classList.add('disabled');
    } else {
        nextButton.classList.remove('disabled');
    }
}


document.addEventListener('DOMContentLoaded', renderReviews);

