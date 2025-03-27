// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile navigation toggle
const createMobileNav = () => {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Create hamburger menu button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        position: absolute;
        right: 1rem;
        top: 1rem;
    `;

    // Toggle navigation
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Add hamburger to nav
    nav.appendChild(hamburger);

    // Handle mobile navigation
    const handleMobileNav = () => {
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
        } else {
            hamburger.style.display = 'none';
            navLinks.classList.remove('active');
        }
    };

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Initial check and event listener for resize
    handleMobileNav();
    window.addEventListener('resize', handleMobileNav);
};

// Handle contact form submission
const setupContactForm = () => {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // You can handle the form submission here
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        });
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createMobileNav();
    setupContactForm();

    // Add scroll animation to elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.section').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});