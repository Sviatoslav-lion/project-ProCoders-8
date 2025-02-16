document.addEventListener('DOMContentLoaded', function () {
 
  const style = document.createElement('style');
  style.innerHTML = `
   .footer-error-message.success {

      color: green;
    }
    .footer-contact-input-email.invalid {
      border-bottom-color: red;
    }
    .footer-contact-input-email.valid {
      border-bottom-color: green;
    }
  `;
    document.head.appendChild(style);

    const emailInput = document.querySelector('.footer-contact-input-email');
    const modalBackdrop = document.querySelector('.js-footer-modal-backdrop');
    const closeModalBtn = document.querySelector('.js-footer-close-btn');
    const form = document.querySelector('.js-footer-contact-form');

    function validateEmailInput(input) {
      const email = input.value.trim();
      const emailPattern = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let message = input.nextElementSibling;

      if (!message || !message.classList.contains('footer-error-message')) {
        message = document.createElement('div');
        message.classList.add('footer-error-message');
        input.parentNode.appendChild(message);
      }

      if (emailPattern.test(email)) {
        message.textContent = 'Success!';
        message.classList.add('success');
        input.classList.remove('invalid');
        input.classList.add('valid');
        message.style.opacity = '1';
        message.style.transform = 'translateY(0)';
      } else {
        message.textContent = 'Invalid email, try again';
        message.classList.remove('success');
        input.classList.remove('valid');
        input.classList.add('invalid');
        message.style.opacity = '1';
        message.style.transform = 'translateY(0)';
      }

      if (email === '') {
        message.style.opacity = '0';
        message.style.transform = 'translateY(5px)';
        input.classList.remove('invalid', 'valid');
      }
    }

    function handleFormSubmit(event) {
      event.preventDefault();
      const email = emailInput.value.trim();
      const commentInput = document.querySelector(
        '.js-footer-contact-input[type="text"]'
      );
      const comment = commentInput.value.trim();

      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        iziToast.error({
          title: 'Error',
          message: 'Please enter a valid email!',
          position: 'topRight',
        });
        emailInput.classList.add('invalid');
        return;
      }

      axios
        .post(
          'https://portfolio-js.b.goit.study/api/requests',
          { email, comment },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        .then(response => {
          document.querySelector('.js-footer-modal-title').textContent =
            response.data.title;
          document.querySelector('.js-footer-modal-tex').textContent =
            response.data.message;
          openModal();
          emailInput.value = '';
          commentInput.value = '';
          emailInput.classList.remove('valid', 'invalid');
          if (emailInput.nextElementSibling) {
            emailInput.nextElementSibling.style.opacity = '0';
            emailInput.nextElementSibling.style.transform = 'translateY(5px)';
          }
        })
        .catch(() => {
          iziToast.error({
            title: 'Error',
            message: 'Failed to send request, please try again!',
            position: 'topRight',
          });
        });
    }

    function openModal() {
      modalBackdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';   
      modalBackdrop.addEventListener('click', handleModalClick);
      document.addEventListener('keydown', handleEscapeKey);
    }

    function closeModal() {
      modalBackdrop.classList.remove('is-open');
       document.body.style.overflow = '';
      modalBackdrop.removeEventListener('click', handleModalClick);
      document.removeEventListener('keydown', handleEscapeKey);
    }

    function handleModalClick(event) {
      if (event.target === modalBackdrop) {
        closeModal();
      }
    }

    function handleEscapeKey(event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    }

    emailInput.addEventListener('input', function () {
      validateEmailInput(this);
    });

    form.addEventListener('submit', handleFormSubmit);
    closeModalBtn.addEventListener('click', closeModal);
  });



