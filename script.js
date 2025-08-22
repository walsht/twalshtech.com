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
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
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
            
            // Form submitted successfully - let Formspree handle confirmation
            this.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        } catch (error) {
        console.error('Error submitting form:', error);
        alert(`There was an error sending your message: ${error.message}. Please try again.`);
        
        // Reset button
        const submitButton = this.querySelector('.submit-button');
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
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

// Protected email display
document.addEventListener('DOMContentLoaded', () => {
    const email = 'twalsh1@gmail.com';
    
    // Function to show copy confirmation message
    function showCopyMessage(element, message) {
        // Create or update message element
        let messageEl = document.getElementById('copy-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.id = 'copy-message';
            messageEl.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #10b981;
                color: white;
                padding: 12px 20px;
                border-radius: 6px;
                font-weight: 500;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            document.body.appendChild(messageEl);
        }
        
        messageEl.textContent = message;
        messageEl.style.transform = 'translateX(0)';
        
        // Hide after 3 seconds
        setTimeout(() => {
            messageEl.style.transform = 'translateX(100%)';
        }, 3000);
    }
    
    // Function to handle email reveal
    function revealEmail(element, originalText) {
        // Check if email is already revealed
        if (element.textContent === email) {
            // Email is already shown, open mailto link
            const mailtoLink = `mailto:${email}?subject=TWalsh Tech Inquiry`;
            window.open(mailtoLink, '_blank');
            return;
        }
        
        // First click - reveal email and copy to clipboard
        // Try to open mailto link first
        try {
            const mailtoLink = `mailto:${email}?subject=TWalsh Tech Inquiry`;
            window.open(mailtoLink, '_blank');
        } catch (error) {
            console.log('Mailto link failed, showing email directly');
        }
        
        // Always copy to clipboard and show email
        navigator.clipboard.writeText(email).then(() => {
            element.textContent = email;
            element.style.color = '#10b981';
            element.style.cursor = 'pointer';
            
            // Add mailto instruction
            element.title = 'Email copied! Click again to open email client.';
            
            // Show success message
            showCopyMessage(element, 'Email copied to clipboard!');
            
            // Reset after 10 seconds (longer for better UX)
            setTimeout(() => {
                element.textContent = originalText;
                element.style.color = '';
                element.style.cursor = 'pointer';
                element.title = '';
            }, 10000);
        }).catch(() => {
            // Fallback if clipboard fails
            element.textContent = email;
            element.style.color = '#10b981';
            element.style.cursor = 'pointer';
            element.title = 'Email revealed! Click again to open email client.';
            
            showCopyMessage(element, 'Email revealed!');
            
            setTimeout(() => {
                element.textContent = originalText;
                element.style.color = '';
                element.style.cursor = 'pointer';
                element.title = '';
            }, 10000);
        });
    }
    
    // Contact info email
    const contactEmail = document.getElementById('protected-email');
    if (contactEmail) {
        contactEmail.addEventListener('click', function() {
            revealEmail(this, '[Click to reveal]');
        });
    }
    
    // Header email
    const headerEmail = document.getElementById('header-email');
    if (headerEmail) {
        headerEmail.addEventListener('click', function() {
            revealEmail(this, '[Click to reveal email]');
        });
    }
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
