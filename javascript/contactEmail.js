/* contactEmail.js  -------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

  /* 0. initialise EmailJS (put your public key) */
  emailjs.init('6ToLrPgZGe_2ZWxUw');

  /* 1. cache DOM elements */
  const form   = document.querySelector('#contact-about form');          // ← your only form
  const button = form.querySelector('button[type="submit"]');

  /* 2. helper — reCAPTCHA token */
  function getCaptchaToken(){
    return grecaptcha.getResponse();   // "" if unchecked
  }

  /* 3. handle submit */
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const token = getCaptchaToken();
    if (!token){
      showToast('Please verify that you’re a human 🙂','warning');
      return;
    }

    button.disabled = true;

    const params = {
      name   : form.name.value,
      email  : form.email.value,
      message: form.message.value,
      'g-recaptcha-response': token              // ← required key name
    };

    try{
      await emailjs.send('service_rvzzcoh','template_dfoejzm',params);
      showToast('Message sent – thank you!','light');
      form.reset();
      grecaptcha.reset();
    }catch(err){
      console.error('EmailJS error:', err.text || err);
      showToast(err.text || 'Send failed.','danger');
    }finally{
      button.disabled = false;
    }
  });

  /* 4. showToast helper stays unchanged ... */
});


//toast helper
function showToast(message, variant = "info", delay = 5000) {
  const container = document.getElementById("toastContainer");

  // Build toast element
  const toast = document.createElement("div");
  toast.className = `toast align-items-center border-0 text-nowrap bg-${variant} ${
    variant === "light" ? "text-black" : "text-white"
  }`;
  toast.role = "alert";
  toast.ariaLive = "assertive";
  toast.ariaAtomic = "true";
  toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast" aria-label="Close"></button>
      </div>`;

  container.appendChild(toast);

  // Activate & auto‑dispose
  const bsToast = new bootstrap.Toast(toast, { delay });
  bsToast.show();
  toast.addEventListener("hidden.bs.toast", () => toast.remove());
}
