document.addEventListener("DOMContentLoaded", function () {
    console.log("Mobile-friendly portfolio section loaded!");
});












document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".accordion-item");

    items.forEach((item) => {
        const header = item.querySelector(".accordion-header");

        header.addEventListener("click", function () {
            item.classList.toggle("open");
        });
    });
});





















document.addEventListener("DOMContentLoaded", function () {
    const buttonEl = document.querySelector(".swiper-button-next");
    const swiperEl = document.querySelector(".about-me-swiper-container");

    const swiperAbout = new Swiper(".about-me-skills", {
        speed: 800,
        loop: true,
        slidesPerView: 2,
        slideActiveClass: "swiper-content-wrap-active",
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        mousewheel: {
            invert: true,
        },
        breakpoints: {
            375: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1440: { slidesPerView: 6 },
        },
        slideToClickedSlide: true,
    });

    // Перехід на наступний слайд при натисканні на кнопку
    buttonEl.addEventListener("click", () => {
        swiperAbout.slideNext();
    });

    // Керування слайдером за допомогою клавіатури
    swiperEl.addEventListener("keydown", function (event) {
        event.preventDefault();
        if (event.key === "ArrowRight") {
            swiperAbout.slideNext();
        } else if (event.key === "ArrowLeft") {
            swiperAbout.slidePrev();
        }
    });
});


