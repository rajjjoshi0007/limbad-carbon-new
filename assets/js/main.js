// Navigation scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('expanded');
    } else {
        nav.classList.remove('expanded');
    }
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Observe elements
document.querySelectorAll('.section-header, .products-grid').forEach((el) => {
    observer.observe(el);
});

// Initialize all page functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuBtn && mobileNav) {
        let isMenuOpen = false;
        
        mobileMenuBtn.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            // Toggle menu button animation
            mobileMenuBtn.classList.toggle('active');
            
            // Toggle mobile menu visibility
            mobileNav.style.display = isMenuOpen ? 'block' : 'none';
            
            // Toggle body scroll
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        });
        
        // Close menu when clicking links
        const links = mobileNav.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenuBtn.classList.remove('active');
                mobileNav.style.display = 'none';
                document.body.style.overflow = '';
            });
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            try {
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    alert('Thank you for your message. We will contact you soon!');
                    this.reset();
                } else {
                    throw new Error('Something went wrong');
                }
            } catch (error) {
                alert('Sorry, there was an error sending your message. Please try again later.');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        });
    }
}); 