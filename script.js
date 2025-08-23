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
    
    // Check internet connectivity
    if (!navigator.onLine) {
        alert('Please check your internet connection and try again.');
        return;
    }
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Enhanced validation with better error messages
    if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields (Name, Email, and Message are required).');
        return;
    }
    
    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address (e.g., user@example.com).');
        return;
    }
    
    // Validate message length
    if (data.message.length < 10) {
        alert('Please provide a more detailed message (at least 10 characters).');
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

// Advanced email obfuscation system
document.addEventListener('DOMContentLoaded', () => {
    // Email encoded in multiple layers to prevent scraping
    const emailParts = {
        user: btoa('walshitech'),
        domain: btoa('gmail.com'),
        separator: btoa('@')
    };
    
    // Function to decode email (multiple layers of obfuscation)
    function decodeEmail() {
        try {
            const user = atob(emailParts.user);
            const domain = atob(emailParts.domain);
            const separator = atob(emailParts.separator);
            return user + separator + domain;
        } catch (error) {
            // Fallback if decoding fails
            return 'contact@twalshtech.com';
        }
    }
    
    // Function to reveal email with additional security
    function revealEmail(element, originalText) {
        // If email is already revealed, don't do anything
        const currentEmail = decodeEmail();
        if (element.textContent === currentEmail) {
            return;
        }
        
        // Reveal email and copy to clipboard
        navigator.clipboard.writeText(currentEmail).then(() => {
            element.textContent = currentEmail;
            element.style.color = '#10b981';
            element.style.cursor = 'pointer';
            element.title = 'Click to open email client';
        }).catch(() => {
            // Fallback if clipboard fails
            element.textContent = currentEmail;
            element.style.color = '#10b981';
            element.style.cursor = 'pointer';
            element.title = 'Click to open email client';
        });
    }
    
    // Function to open mailto link with obfuscated email
    function openMailto(element, originalText) {
        const currentEmail = decodeEmail();
        if (element.textContent === currentEmail) {
            // Email is visible, open mailto link
            const mailtoLink = `mailto:${currentEmail}?subject=TWALSH Tech Inquiry`;
            
            // Try multiple methods to open mailto link
            try {
                // Method 1: Direct window.location (works on most browsers)
                window.location.href = mailtoLink;
            } catch (error) {
                try {
                    // Method 2: window.open (fallback)
                    window.open(mailtoLink, '_blank');
                } catch (error2) {
                    // Method 3: Create and click a temporary link
                    const tempLink = document.createElement('a');
                    tempLink.href = mailtoLink;
                    tempLink.style.display = 'none';
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                }
            }
        }
    }
    
    // Contact info email
    const contactEmail = document.getElementById('protected-email');
    if (contactEmail) {
        // Reveal on hover or click
        contactEmail.addEventListener('mouseenter', function() {
            revealEmail(this, '[Click to reveal]');
        });
        contactEmail.addEventListener('click', function() {
            const currentEmail = decodeEmail();
            if (this.textContent === currentEmail) {
                openMailto(this, '[Click to reveal]');
            } else {
                revealEmail(this, '[Click to reveal]');
            }
        });
    }
    
    // Header email
    const headerEmail = document.getElementById('header-email');
    if (headerEmail) {
        // Reveal on hover or click
        headerEmail.addEventListener('mouseenter', function() {
            revealEmail(this, '[Click to reveal email]');
        });
        headerEmail.addEventListener('click', function() {
            const currentEmail = decodeEmail();
            if (this.textContent === currentEmail) {
                openMailto(this, '[Click to reveal email]');
            } else {
                revealEmail(this, '[Click to reveal email]');
            }
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

// Interactive hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(5, 150, 105, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Interactive hover effects for portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 15px 35px rgba(5, 150, 105, 0.12)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
    });
});

// Interactive hover effects for testimonials
document.querySelectorAll('.testimonial').forEach(testimonial => {
    testimonial.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 12px 30px rgba(5, 150, 105, 0.1)';
    });
    
    testimonial.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.06)';
    });
});

// Smooth reveal animations on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial, .about-content');
    
    elements.forEach((el, index) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            el.classList.add('visible');
        }
    });
};

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Image Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalClose = document.getElementById('modalClose');
    const clickableImages = document.querySelectorAll('.clickable-image');

    // Open modal when clicking on images
    clickableImages.forEach(img => {
        img.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            const imageTitle = this.getAttribute('data-title');
            const imageDescription = this.getAttribute('data-description');

            modalImage.src = imageSrc;
            modalImage.alt = imageTitle;
            modalTitle.textContent = imageTitle;
            modalDescription.textContent = imageDescription;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close modal when clicking close button
    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking on backdrop
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Add smooth hover effects for clickable images
    clickableImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
    });
});
