document.addEventListener('DOMContentLoaded', () => {
    // Hero Video - Safari-Compatible Autoplay with AGGRESSIVE LOOP
    const heroVideo = document.querySelector('.hero-video');

    if (heroVideo) {
        let hasPlayed = false;

        // Force video to be truly muted (Safari quirk)
        heroVideo.muted = true;
        heroVideo.setAttribute('muted', '');
        heroVideo.defaultMuted = true;
        heroVideo.volume = 0;

        // FORCE LOOP - Multiple methods
        heroVideo.loop = true;
        heroVideo.setAttribute('loop', '');

        // Function to attempt video playback
        const attemptPlay = () => {
            if (hasPlayed) return;

            const playPromise = heroVideo.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        hasPlayed = true;
                        console.log('✅ Video playing successfully');
                    })
                    .catch(error => {
                        console.log('⚠️ Autoplay attempt failed, will retry on user interaction');
                    });
            }
        };

        // Attempt 1: Immediate play after load
        heroVideo.addEventListener('loadedmetadata', () => {
            attemptPlay();
        });

        // Attempt 2: On canplay event
        heroVideo.addEventListener('canplay', () => {
            attemptPlay();
        });

        // Attempt 3: On any user interaction (Safari requirement)
        const userInteractionEvents = ['touchstart', 'click', 'scroll', 'mousemove'];
        const tryPlayOnInteraction = () => {
            attemptPlay();
        };

        userInteractionEvents.forEach(event => {
            document.addEventListener(event, tryPlayOnInteraction, { once: true, passive: true });
        });

        // Attempt 4: Intersection Observer (when video is visible)
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    attemptPlay();
                }
            });
        }, {
            threshold: 0.25
        });

        videoObserver.observe(heroVideo);

        // Attempt 5: Resume on visibility change
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && heroVideo.paused && hasPlayed) {
                heroVideo.play().catch(() => {
                    // Silently fail
                });
            }
        });

        // LOOP METHOD 1: ended event (most reliable)
        heroVideo.addEventListener('ended', () => {
            console.log('🔄 Video ended, restarting...');
            heroVideo.currentTime = 0;
            heroVideo.play().then(() => {
                console.log('✅ Loop restart successful');
            }).catch((err) => {
                console.log('❌ Loop restart failed:', err);
            });
        });

        // LOOP METHOD 2: Aggressive interval check
        let loopCheckInterval;
        heroVideo.addEventListener('playing', () => {
            // Clear any existing interval
            if (loopCheckInterval) clearInterval(loopCheckInterval);

            // Check every 100ms if we're near the end
            loopCheckInterval = setInterval(() => {
                if (heroVideo.duration && heroVideo.currentTime) {
                    const timeLeft = heroVideo.duration - heroVideo.currentTime;

                    // Restart 0.2 seconds before the end
                    if (timeLeft < 0.2 && timeLeft > 0) {
                        console.log('🔄 Near end (0.2s), looping manually...');
                        heroVideo.currentTime = 0;
                    }
                }
            }, 100);
        });

        // Clean up interval when video is paused
        heroVideo.addEventListener('pause', () => {
            if (loopCheckInterval) {
                clearInterval(loopCheckInterval);
            }
        });

        // Initial load attempt
        setTimeout(() => {
            attemptPlay();
        }, 100);
    }

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
