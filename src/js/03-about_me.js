document.addEventListener("DOMContentLoaded", function () {
    const aboutItems = document.querySelectorAll(".accordion-item");


    aboutItems.forEach((item) => {
        const aboutmeHeader = item.querySelector(".accordion-header");
        const aboutmeIcon = item.querySelector(".abme");
        const aboutmeContent = item.querySelector(".accordion-content");
        
        aboutmeContent.style.display = "none";
        aboutmeIcon.style.transform = "rotate(0deg)";

        aboutmeHeader.addEventListener("click", function () {
            //item.classList.toggle("open");                      // відкриваємо прихований вміст елементу
            const isOpen = aboutmeContent.style.display === "block";     // якщо відкрили, тоді присвоємо змінній значення видимості  
            aboutmeContent.style.display = isOpen ? "none" : "block";
            aboutmeHeader.classList.toggle("active", !isOpen);
            aboutmeIcon.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
        });
    });
});

/*
document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".accordion-about-me");
  
    faqItems.forEach((item) => {
      const faqAnswer = item.querySelector(".accordion-content");
      const faqQuestion = item.querySelector(".accordion-header");
      const faqIcon = item.querySelector(".aboutme-open-icon");
  
      faqAnswer.style.display = "none";
      faqIcon.style.transform = "rotate(0deg)";
  
      faqQuestion.addEventListener("click", function () {
        const isOpen = faqAnswer.style.display === "block";
  
        faqAnswer.style.display = isOpen ? "none" : "block";
        faqQuestion.classList.toggle("active", !isOpen);
        faqIcon.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
      });
    });
  });
  */




















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


