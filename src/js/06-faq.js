document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-accordion");

  faqItems.forEach((item) => {
    const faqAnswer = item.querySelector(".faq-answer");
    const faqQuestion = item.querySelector(".faq-question-title");
    const faqIcon = item.querySelector(".faq-open-icon");

    faqAnswer.style.maxHeight = "0";
    faqAnswer.style.overflow = "hidden";
    faqAnswer.style.transition = "max-height 0.3s ease-out";

    faqIcon.style.transform = "rotate(0deg)";
    
    faqQuestion.addEventListener("click", function () {
      const isOpen = faqAnswer.style.maxHeight !== "0px";

      if (isOpen) {
        faqAnswer.style.maxHeight = "0";
      } else {
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
      }

      faqQuestion.classList.toggle("active", !isOpen);
      faqIcon.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
    });
  });
});
