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

// Enhanced scroll effects
const videoBackground = document.querySelector('.video-background');
const videoOverlay = document.querySelector('.video-overlay');
const heroContent = document.querySelector('.hero-content');
const sections = document.querySelectorAll('section');

let lastScrollY = window.scrollY;
let ticking = false;

function updateParallax() {
    const scrollY = window.scrollY;
    
    // Video background shrinking effect
    if (scrollY > 50) {
        videoBackground.classList.add('shrink');
        videoOverlay.classList.add('scrolled');
        heroContent.classList.add('scrolled');
    } else {
        videoBackground.classList.remove('shrink');
        videoOverlay.classList.remove('scrolled');
        heroContent.classList.remove('scrolled');
    }

    // Parallax effect for sections
    sections.forEach(section => {
        const speed = section.dataset.speed || 0.5;
        const yPos = -(scrollY * speed);
        section.style.transform = `translateY(${yPos}px)`;
    });

    // Update last scroll position
    lastScrollY = scrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Add hover effect to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Image Modal functionality
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeButton = document.querySelector('.close-button');
const plusButtons = document.querySelectorAll('.card-plus-button');

plusButtons.forEach(button => {
    button.addEventListener('click', function() {
        const imageSrc = this.getAttribute('data-image-src');
        modalImage.src = imageSrc;
        imageModal.style.display = 'block';
    });
});

closeButton.addEventListener('click', function() {
    imageModal.style.display = 'none';
});

imageModal.addEventListener('click', function(event) {
    if (event.target === imageModal) {
        imageModal.style.display = 'none';
    }
});

// Gallery navigation buttons functionality
const galleryScrollWrapper = document.querySelector('.gallery-scroll-wrapper');
const prevGalleryButton = document.getElementById('prev-gallery');
const nextGalleryButton = document.getElementById('next-gallery');

if (galleryScrollWrapper && prevGalleryButton && nextGalleryButton) {
    const scrollAmount = 350; // Adjust based on card width + gap

    prevGalleryButton.addEventListener('click', () => {
        galleryScrollWrapper.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextGalleryButton.addEventListener('click', () => {
        galleryScrollWrapper.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

// Product Colors Section functionality
const currentProductImage = document.getElementById('current-product-image');
const colorSwatches = document.querySelectorAll('.color-swatch');

if (currentProductImage && colorSwatches.length > 0) {
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            // Remove active class from all swatches
            colorSwatches.forEach(s => s.classList.remove('active'));
            
            // Add active class to the clicked swatch
            this.classList.add('active');
            
            // Get the new image source
            const newImageSrc = this.getAttribute('data-image');
            
            // Apply fade-out class, then change source, then fade-in
            currentProductImage.classList.add('fade-out');
            
            setTimeout(() => {
                currentProductImage.src = newImageSrc;
                currentProductImage.classList.remove('fade-out');
            }, 500); // Match CSS transition duration
        });
    });
}

// Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    console.log('Hamburger:', hamburger); // Debug
    console.log('Nav Links:', navLinks); // Debug

    if (hamburger && navLinks) {
        // Toggle menu
        hamburger.addEventListener('click', function(e) {
            console.log('Hamburger clicked'); // Debug
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle classes
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Debug the state
            console.log('Hamburger active:', this.classList.contains('active'));
            console.log('Nav Links active:', navLinks.classList.contains('active'));
        });

        // Close menu when clicking links
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                console.log('Link clicked'); // Debug
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !hamburger.contains(e.target) && 
                !navLinks.contains(e.target)) {
                console.log('Clicked outside'); // Debug
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}); 