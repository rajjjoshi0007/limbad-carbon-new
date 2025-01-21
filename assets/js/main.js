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

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const body = document.body;

// Only initialize mobile menu if elements exist
if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event from bubbling up
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Prevent clicks inside mobile nav from closing it
    mobileNav.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Initialize all page functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Scroll down button functionality
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const currentSection = this.closest('section');
            let targetSection;

            // Get current page path
            const currentPath = window.location.pathname;
            console.log('Current path:', currentPath);

            // First try to get the next section directly
            targetSection = currentSection.nextElementSibling;
            
            // If no next section found, try specific section based on page
            if (!targetSection) {
                if (currentPath === '/' || currentPath.endsWith('index.html')) {
                    targetSection = document.querySelector('.products-overview');
                } else if (currentPath.includes('application.html')) {
                    targetSection = document.querySelector('.applications-container');
                } else if (currentPath.includes('products.html')) {
                    targetSection = document.querySelector('.products-container');
                } else if (currentPath.includes('about.html')) {
                    targetSection = document.querySelector('.about-container');
                } else if (currentPath.includes('planet.html')) {
                    targetSection = document.querySelector('.planet-container');
                } else if (currentPath.includes('contact.html')) {
                    targetSection = document.querySelector('.contact-container');
                }
            }

            console.log('Current section:', currentSection);
            console.log('Target section:', targetSection);

            if (targetSection) {
                // Add offset for fixed header
                const headerOffset = 100;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.warn('No target section found for scrolling');
                // Fallback: try to scroll to any next section
                const allSections = document.querySelectorAll('section');
                const currentIndex = Array.from(allSections).indexOf(currentSection);
                if (currentIndex >= 0 && currentIndex < allSections.length - 1) {
                    const nextSection = allSections[currentIndex + 1];
                    const headerOffset = 100;
                    const elementPosition = nextSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    } else {
        console.warn('Scroll down button not found on page');
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