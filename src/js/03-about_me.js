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
    const swiper = new Swiper(".swiper", {
        slidesPerView: 2, // 2 кола на екрані
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
        },
        keyboard: {
            enabled: true,
        },
        mousewheel: true,


        breakpoints: {
            768: { 
                slidesPerView: 3,
            },
            1440: { 
                slidesPerView: 6,
            }
        }
    });
});


