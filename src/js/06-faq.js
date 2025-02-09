document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".accordion");

  faqItems.forEach((item) => {
    const faqAnswer = item.querySelector(".faq-answer");
    const faqQuestion = item.querySelector(".faq-question-title");
    const faqIcon = item.querySelector(".faq-open-icon");

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
