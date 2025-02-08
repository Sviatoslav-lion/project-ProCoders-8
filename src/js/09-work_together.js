import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const style = document.createElement('style');
  style.innerHTML = `
    .footer-error-message {
      font-size: 14px;
      margin-top: 5px;
      color: red;
      opacity: 0;
      transform: translateY(5px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .footer-error-message.success {
      color: green;
    }

    .footer-contact-input.error {
      border-bottom-color: red;
    }

    .footer-contact-input.success {
      border-bottom-color: green;
    }

    .footer-contact-input:focus + .footer-error-message,
    .footer-contact-input:valid + .footer-error-message {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // перевірк emailа повідомлення під інпутом
  const emailInput = document.querySelector('.footer-contact-input-email');
  emailInput.addEventListener('input', function () {
    validateEmailInput(this);
  });

  // Функція для перевірки email
  function validateEmailInput(input) {
    const email = input.value.trim();
    const emailPattern = /^[\w\.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let message = input.nextElementSibling;

    if (!message || !message.classList.contains('footer-error-message')) {
      message = document.createElement('div');
      message.classList.add('footer-error-message');
      input.parentNode.appendChild(message);
    }

    if (email && emailPattern.test(email)) {
      message.textContent = 'Success!';
      message.classList.remove('error');
      message.classList.add('success');
      input.classList.remove('error');
      input.classList.add('success');
    } else if (email) {
      message.textContent = 'Invalid email, try again';
      message.classList.remove('success');
      message.classList.add('error');
      input.classList.remove('success');
      input.classList.add('error');
    } else {
      // поле пустое, скрываем сообщение и не меняем стиль
      message.style.opacity = '0';
      message.style.transform = 'translateY(5px)';
      input.classList.remove('error', 'success');
    }
  }

  //input, focus і blur для збереження тексту
  document.querySelectorAll('.js-footer-contact-input').forEach(input => {
    input.addEventListener('input', function () {
      if (!this.hasAttribute('data-full-text')) {
        this.setAttribute('data-full-text', this.value);
      }

      // перевірка email при кожному введенні тексту
      if (input === emailInput) {
        validateEmailInput(input);
      }
    });

    input.addEventListener('focus', function () {
      if (this.hasAttribute('data-full-text')) {
        this.value = this.getAttribute('data-full-text');
      }

      //повідомлення при фокусі
      const message = this.nextElementSibling;
      if (message && message.classList.contains('footer-error-message')) {
        message.style.opacity = '1';
        message.style.transform = 'translateY(0)';
      }
      if (this.value.trim() !== '') {
        validateEmailInput(this);
      }
    });

    input.addEventListener('blur', function () {
      this.setAttribute('data-full-text', this.value);

      //приховати повідомлення при втраті фокуса
      const message = this.nextElementSibling;
      if (message && message.classList.contains('footer-error-message')) {
        message.style.opacity = '0';
        message.style.transform = 'translateY(5px)';
      }
      if (this.value.trim() === '') {
        this.classList.remove('error', 'success');
        this.style.borderBottomColor = '#fafafa33';
      }
    });
  });

  // відправка форми
  document
    .querySelector('.js-footer-contact-form')
    .addEventListener('submit', async function (event) {
      event.preventDefault();

      const emailInput = document.querySelector(
        '.js-footer-contact-input[type="email"]'
      );
      const commentInput = document.querySelector(
        '.js-footer-contact-input[type="text"]'
      );

      const email = emailInput.value.trim();
      const comment = commentInput.value.trim();

      // перевірка email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        iziToast.error({
          title: 'Error',
          message: 'Please enter a valid email!',
          position: 'topRight',
        });
        emailInput.classList.add('error');
        return;
      }
      emailInput.classList.remove('error');
      emailInput.classList.add('success');

      const requestData = { email, comment };

      try {
        const response = await axios.post(
          'https://portfolio-js.b.goit.study/api/requests',
          requestData,
          { headers: { 'Content-Type': 'application/json' } }
        );

        //модальне вікно з повідомленням
        document.querySelector('.js-footer-modal-title').textContent =
          response.data.title;
        document.querySelector('.js-footer-modal-tex').textContent =
          response.data.message;
        document
          .querySelector('.js-footer-modal-backdrop')
          .classList.add('is-open');

        // очистка поля введення
        emailInput.value = '';
        commentInput.value = '';
        emailInput.classList.remove('success');
        commentInput.classList.remove('success');

        // видалення тексту
        emailInput.removeAttribute('data-full-text');
        commentInput.removeAttribute('data-full-text');

        // приховаты повідомлення "Success!"
        const emailMessage = emailInput.nextElementSibling;
        if (
          emailMessage &&
          emailMessage.classList.contains('footer-error-message')
        ) {
          emailMessage.style.opacity = '0';
          emailMessage.style.transform = 'translateY(5px)';
        }

        // скиданя валідаці email після успішної відправки
        emailInput.classList.remove('success');
        const emailMessageElement = emailInput.nextElementSibling;
        if (emailMessageElement) {
          emailMessageElement.style.opacity = '0';
          emailMessageElement.style.transform = 'translateY(5px)';
        }

        emailInput.value = '';
      } catch (error) {
        console.error('Request error:', error);

        let errorMessage = 'Failed to send request, please try again!';

        if (error.response) {
          console.log('Error status:', error.response.status);
          console.log('Error data:', error.response.data);

          if (error.response.status === 400) {
            errorMessage =
              error.response.data.message || 'Invalid request. Check the data!';
          }
        } else if (error.request) {
          console.log(
            'The request was sent, but no response was received:',
            error.request
          );
          errorMessage = 'Network error. Check your internet connection.';
        } else {
          console.log('Error while configuring query:', error.message);
        }

        iziToast.error({
          title: 'Error',
          message: errorMessage,
          position: 'topRight',
        });
      }
    });

  // закриття модального вікна
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
