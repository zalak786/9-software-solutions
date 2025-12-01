// Initialize Swiper when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Hero Slider
  const heroSwiper = new Swiper('.hero-slider', {
    loop: true,
    effect: 'fade',
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // Initialize Testimonials Slider
  const testimonialsSwiper = new Swiper('.testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      }
    }
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
        // Close mobile menu after clicking a link
        navLinks.classList.remove('active');
      }
    });
  });

  // Form submission
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('Form submitted:', { name, email, message });

    contactForm.reset();
    alert('Thank you for your message! We will get back to you soon.');
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
      navbar.style.backgroundColor = '#ffffff';
    }
  });

  // Chat Bubble Functionality
  const chatBubble = document.getElementById('chatBubble');
  const chatModal = document.getElementById('chatModal');
  const closeChatModal = document.getElementById('closeChatModal');
  const chatContactForm = document.getElementById('chatContactForm');
  const chatFormStatus = document.getElementById('chatFormStatus');

  // Toggle chat modal
  chatBubble.addEventListener('click', () => {
    chatModal.classList.toggle('active');
  });

  // Close modal
  closeChatModal.addEventListener('click', () => {
    chatModal.classList.remove('active');
  });

  // Close modal when clicking outside
  document.addEventListener('click', (e) => {
    if (!chatModal.contains(e.target) && !chatBubble.contains(e.target)) {
      chatModal.classList.remove('active');
    }
  });

  // Chat form submission with EmailJS and reCAPTCHA
  chatContactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('chatName').value,
      email: document.getElementById('chatEmail').value,
      message: document.getElementById('chatMessage').value
    };

    // Show loading state
    const submitBtn = chatContactForm.querySelector('.chat-submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      // Execute reCAPTCHA v3 verification
      const recaptchaToken = await grecaptcha.execute('6Ld6ShssAAAAABvXqiOjNeBKjcCLulra9vuCH8EL', { action: 'submit' });

      // Initialize EmailJS
      emailjs.init('h7fjt-1VDB3aipMgL');

      // Send email using EmailJS
      const response = await emailjs.send(
        'service_3s5gxmd',
        'template_t7jxazl',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'info@9softwaresolutions.com',
          recaptcha_token: recaptchaToken
        }
      );

      // Show success message
      chatFormStatus.className = 'chat-form-status success';
      chatFormStatus.textContent = 'Message sent successfully! We\'ll get back to you soon.';

      // Reset form
      chatContactForm.reset();

      // Hide status and close modal after 3 seconds
      setTimeout(() => {
        chatFormStatus.className = 'chat-form-status';
        chatModal.classList.remove('active');
      }, 3000);

      console.log('Email sent successfully:', response);

    } catch (error) {
      console.error('Error sending email:', error);

      // Show error message
      chatFormStatus.className = 'chat-form-status error';
      chatFormStatus.textContent = error.text || 'Failed to send message. Please try again.';

      setTimeout(() => {
        chatFormStatus.className = 'chat-form-status';
      }, 3000);
    } finally {
      // Reset button
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  });
});