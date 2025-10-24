import { initUI } from './ui.js';
import { loadAnimations } from './animations.js'; 

document.addEventListener('DOMContentLoaded', () => {
  initUI();

  
  if (typeof loadAnimations === 'function') {
    loadAnimations();
  } else {
    console.warn('loadAnimations() not found — ensure animations.js exports loadAnimations');
  }

  console.log('🚀 Portfolio Initialized!');
});
  
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact__info');
  const serviceID = 'service_877jil2';
  const templateID = 'template_nsnrozt';

  form.addEventListener('submit', function (e) {
    e.preventDefault(); 

    const messageInput = form.querySelector('textarea[name="message"]');
    const messageText = messageInput.value.trim();

    
    if (messageText.length < 10) {
      Swal.fire({
        title: 'Message Too Short ⚠️',
        text: 'Please enter at least 10 characters before submitting.',
        icon: 'warning',
        background: '#0f1720',
        color: '#ffffff',
        confirmButtonColor: '#2bb0ff',
        customClass: { popup: 'rounded-popup' }
      });
      return; 
    }

    emailjs.sendForm(serviceID, templateID, form)
      .then(() => {
        Swal.fire({
          title: 'Message Sent ✅',
          text: 'Thank you! I’ll get back to you soon.',
          icon: 'success',
          background: '#0f1720',
          color: '#ffffff',
          confirmButtonColor: '#2bb0ff',
          customClass: { popup: 'rounded-popup' }
        });
        form.reset();
      })
      .catch(() => {
        Swal.fire({
          title: 'Failed to Send ❌',
          text: 'Something went wrong. Please try again.',
          icon: 'error',
          background: '#0f1720',
          color: '#ffffff',
          confirmButtonColor: '#ff4d4d',
          customClass: { popup: 'rounded-popup' }
        });
      });
  });
});
         