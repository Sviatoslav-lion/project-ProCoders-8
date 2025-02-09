import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
    } `;
  document.head.appendChild(style);

  const emailInput = document.querySelector('.footer-contact-input-email');

  emailInput.addEventListener('input', function () {
    validateEmailInput(this);
  });

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

  document
    .querySelector('.js-footer-contact-form')
    .addEventListener('submit', async function (event) {
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

      try {
        const response = await axios.post(
          'https://portfolio-js.b.goit.study/api/requests',
          { email, comment },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        document.querySelector('.js-footer-modal-title').textContent =
          response.data.title;
        document.querySelector('.js-footer-modal-tex').textContent =
          response.data.message;
        document
          .querySelector('.js-footer-modal-backdrop')
          .classList.add('is-open');

        emailInput.value = '';
        commentInput.value = '';
        emailInput.classList.remove('valid', 'invalid');
        if (emailInput.nextElementSibling) {
          emailInput.nextElementSibling.style.opacity = '0';
          emailInput.nextElementSibling.style.transform = 'translateY(5px)';
        }
      } catch (error) {
        iziToast.error({
          title: 'Error',
          message: 'Failed to send request, please try again!',
          position: 'topRight',
        });
      }
    });

  const modalBackdrop = document.querySelector('.js-footer-modal-backdrop');
  const closeModalBtn = document.querySelector('.js-footer-close-btn');

  modalBackdrop.addEventListener('click', function (event) {
    if (event.target === modalBackdrop) {
      modalBackdrop.classList.remove('is-open');
    }
  });

  closeModalBtn.addEventListener('click', function () {
    modalBackdrop.classList.remove('is-open');
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      modalBackdrop.classList.remove('is-open');
    }
  });
});

