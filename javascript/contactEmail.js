document.addEventListener('DOMContentLoaded', () => {
  emailjs.init('6ToLrPgZGe_2ZWxUw');

  document.querySelectorAll('form').forEach(form => {
    const button = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async e => {
      e.preventDefault();

      const token = grecaptcha.getResponse();
      if (!token) {
        showToast('Please verify that you’re a human 🙂', 'warning');
        return;
      }

      button.disabled = true;

      const formData = new FormData(form);
      const params = Object.fromEntries(formData.entries());
      params['g-recaptcha-response'] = token;

      try {
        await emailjs.send('service_rvzzcoh', 'template_dfoejzm', params);
        showToast('Message sent – thank you!', 'light');
        form.reset();
        grecaptcha.reset();
      } catch (err) {
        console.error('EmailJS error:', err.text || err);
        showToast(err.text || 'Send failed.', 'danger');
      } finally {
        button.disabled = false;
      }
    });
  });
});

function showToast(message, variant = 'info', delay = 5000) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');

  toast.className = `toast align-items-center border-0 text-nowrap bg-${variant} ${
    variant === 'light' ? 'text-black' : 'text-white'
  }`;
  toast.role = 'alert';
  toast.ariaLive = 'assertive';
  toast.ariaAtomic = 'true';

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast" aria-label="Close"></button>
    </div>`;

  container.appendChild(toast);

  const bsToast = new bootstrap.Toast(toast, { delay });
  bsToast.show();

  toast.addEventListener('hidden.bs.toast', () => toast.remove());
}
