/* main.js - entry point */
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

    // document.addEventListener("DOMContentLoaded", () => {
    //   const form = document.getElementById("contact__info");

    //   form.addEventListener("submit", function(e) {
    //     e.preventDefault();

    //     // Replace these with your actual EmailJS IDs
    //     const serviceID = "service_877jil2";
    //     const templateID = "template_nsnrozt";

    //     emailjs.sendForm(serviceID, templateID, this)
    //       .then(() => {
    //       Swal.fire({
    //       title: 'Message Sent Successfully!',
    //       text: 'I’ll get back to you soon.',
    //       icon: 'success',
    //       background: '#0f1720',
    //       color: '#ffffff',
    //       confirmButtonColor: '#2bb0ff',
    //       confirmButtonText: 'OK',
    //       showClass: {
    //         popup: `
    //           animate__animated
    //           animate__fadeInDown
    //         `
    //       },
    //       hideClass: {
    //         popup: `
    //           animate__animated
    //           animate__fadeOutUp
    //         `
    //       },
    //       customClass: {
    //         popup: 'rounded-popup'
    //       }
    //     });
    //     form.reset();
    //   })
    //   .catch(() => {
    //     Swal.fire({
    //       title: 'Oops!',
    //       text: 'Failed to send message. Please try again later.',
    //       icon: 'error',
    //       confirmButtonColor: '#ff4d4d',
    //       background: '#0f1720',
    //       color: '#ffffff',
    //       customClass: {
    //         popup: 'rounded-popup'
    //       }
        // });
      // });

    
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact__info');
  const serviceID = 'service_877jil2';
  const templateID = 'template_nsnrozt';

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // stops normal form submission

    const messageInput = form.querySelector('textarea[name="message"]');
    const messageText = messageInput.value.trim();

    // ✅ Validation check
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
      return; // stop the send process
    }

    // ✅ Send via EmailJS only once
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
         