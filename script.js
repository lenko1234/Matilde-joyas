document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Optional: Toggle icon between menu and close (x)
            const icon = hamburger.querySelector('i');
            // Re-run lucide icons if we were dynamically changing the icon name, 
            // but for simplicity we'll just toggle the class for CSS handling if needed.
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    // Shimmer Effect Observer
    const shimmerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('do-shimmer');
                shimmerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Select elements to shimmer on scroll
    // Note: We need to add these classes in HTML next
    const shimmerElements = document.querySelectorAll('.shimmer-block, .shimmer-text');
    shimmerElements.forEach(el => shimmerObserver.observe(el));

    // Instagram Button - Show when footer is visible
    const footer = document.querySelector('.footer');
    const instagramButton = document.querySelector('.instagram-float');

    if (footer && instagramButton) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    instagramButton.classList.add('show');
                } else {
                    instagramButton.classList.remove('show');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px' // Trigger slightly before footer is fully visible
        });

        footerObserver.observe(footer);
    }
});
