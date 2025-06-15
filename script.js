// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar and background effects on scroll
let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const nav = document.querySelector('nav');
            const heroBackground = document.querySelector('.hero-background');
            const scrollPosition = window.scrollY;
            
            // Navbar background
            if (scrollPosition > 50) {
                nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            } else {
                nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
            
            // Smooth parallax zoom effect
            if (heroBackground) {
                const scale = 1 + (scrollPosition * 0.0005);
                const translateY = scrollPosition * 0.2;
                
                // Apply transform to the background
                heroBackground.style.transform = `translateZ(0) translateY(${translateY}px)`;
                
                // Apply scale to the pattern overlay
                const patternScale = 1 + (scrollPosition * 0.0003);
                heroBackground.style.setProperty('--pattern-scale', patternScale);
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// Add animation to sections when they come into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

function scrollProjects(direction) {
    const projectGrid = document.querySelector('.project-grid');
    const scrollAmount = 400; // Width of one card + gap
    
    if (direction === 'left') {
        projectGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        projectGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Timeline Parallax Effect
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineContainer = document.querySelector('.timeline-container');
let lastScrollTop = 0;

function checkTimelineItems() {
    const triggerBottom = window.innerHeight * 0.8;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Reset visibility when scrolling up
    if (scrollTop < lastScrollTop) {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop > triggerBottom) {
                item.classList.remove('visible');
            }
        });
    }

    // Show items when scrolling down
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < triggerBottom) {
            item.classList.add('visible');
        }
    });

    lastScrollTop = scrollTop;
}

// Initial check
checkTimelineItems();

// Check on scroll with throttling
let isScrolling;
window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        checkTimelineItems();
    }, 10);
});

// Resume Modal Functionality
const resumeBtn = document.getElementById('resumeBtn');
const resumeModal = document.getElementById('resumeModal');
const closeModal = document.querySelector('.close-modal');

resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resumeModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

closeModal.addEventListener('click', () => {
    resumeModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore background scrolling
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
        resumeModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.style.display === 'block') {
        resumeModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}); 