// document.addEventListener("DOMContentLoaded", function() {
//     const bgElement = document.querySelector('.hero');
//     bgElement.style.backgroundImage = 'url("/images/hero/hero-mobile.png")';
//   });
import './js/01-header.js';
import './js/02-hero.js';
import './js/03-about_me.js';
import './js/04-benefits.js';
import './js/05-projects.js';
import './js/06-faq.js';
import './js/07-covers.js';
import './js/08-reviews.js';
import './js/09-work_together.js';
import './js/10-menu.js';

// ----- Технічні повідомлення ----------

// document.addEventListener("DOMContentLoaded", function() {
//     // Перевірка підключення Swiper
//     if (typeof Swiper !== 'undefined') {
//         console.log("Swiper скрипт успішно підключено!");
//     } else {
//         console.error("Swiper скрипт не підключено.");
//     }
//     // Перевірка підключення Accordion
//     if (typeof Accordion !== 'undefined') {
//         console.log("Accordion скрипт успішно підключено!");
//     } else {
//         console.error("Accordion скрипт не підключено.");
//     }
// });

// відкладене авантаження зображення
window.onload = function() {
    const bgElement = document.querySelector('.hero');
    bgElement.style.backgroundImage = 'url("/images/hero/hero-mobile.png") no-repeat left center';
  };