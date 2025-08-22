// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModal = document.querySelector('.close');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    try {
        // Show loading state
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
        submitButton.disabled = true;
        
        console.log('Starting form submission...');
        
        // Skip reCAPTCHA for now (NextDNS blocking)
        console.log('Skipping reCAPTCHA due to DNS blocking');
        const recaptchaToken = 'skipped';
        
        // Create form data
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('company', data.company);
        formData.append('service', data.service);
        formData.append('message', data.message);
        
        // reCAPTCHA disabled due to DNS blocking
        // No spam protection for now
        
        console.log('Form data prepared, sending to:', this.action);
        console.log('Form data contents:', Object.fromEntries(formData));
        
        // Use AJAX with proper error handling to prevent redirect
        console.log('Submitting form via AJAX to prevent redirect...');
        
        try {
            // Create form data for AJAX
            const ajaxFormData = new FormData();
            ajaxFormData.append('name', data.name);
            ajaxFormData.append('email', data.email);
            ajaxFormData.append('company', data.company);
            ajaxFormData.append('service', data.service);
            ajaxFormData.append('message', data.message);
            
            // Submit via AJAX
            const xhr = new XMLHttpRequest();
            xhr.open('POST', this.action, true);
            
            xhr.onload = () => {
                if (xhr.status === 200 || xhr.status === 302) {
                    console.log('Form submitted successfully!');
                    // Show success modal
                    successModal.style.display = 'block';
                    
                    // Reset the original form
                    this.reset();
                    
                    // Reset button state
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                } else {
                    throw new Error(`Form submission failed: ${xhr.status}`);
                }
            };
            
            xhr.onerror = () => {
                throw new Error('Network error occurred');
            };
            
            xhr.send(ajaxFormData);
            
        } catch (error) {
            console.error('AJAX submission error:', error);
            // Fallback to traditional submission
            console.log('Falling back to traditional submission...');
            
            // Create and submit form
            const tempForm = document.createElement('form');
            tempForm.method = 'POST';
            tempForm.action = this.action;
            tempForm.style.display = 'none';
            
            for (let [key, value] of formData.entries()) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                tempForm.appendChild(input);
            }
            
            document.body.appendChild(tempForm);
            tempForm.submit();
            document.body.removeChild(tempForm);
            
            // Show success modal
            successModal.style.display = 'block';
            this.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
        
    } catch (error) {
        console.error('Error submitting form:', error);
        alert(`There was an error sending your message: ${error.message}. Please try again.`);
        
        // Reset button
        const submitButton = this.querySelector('.submit-button');
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
});

// Close modal when clicking the X
closeModal.addEventListener('click', () => {
    successModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.style.display = 'none';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal.style.display === 'block') {
        successModal.style.display = 'none';
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .about-content, .contact-container');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form field focus effects
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Auto-resize textarea
const messageTextarea = document.getElementById('message');
if (messageTextarea) {
    messageTextarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
}
