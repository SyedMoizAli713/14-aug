document.addEventListener('DOMContentLoaded', function() {
    try {
        // Fix viewport height issues on mobile
        function setViewportHeight() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);

        // Initialize AOS with mobile detection
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100,
            });
        }

        // Improved scroll detection for mobile
        function handleScroll() {
            const navbar = document.querySelector('.navbar');
            const backToTopButton = document.querySelector('.back-to-top');
            
            if (navbar) {
                navbar.classList.toggle('scrolled', window.scrollY > 100);
            }
            
            if (backToTopButton) {
                backToTopButton.classList.toggle('active', window.scrollY > 300);
            }
        }

        // Throttle scroll events for performance
        let isScrolling;
        window.addEventListener('scroll', function() {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(handleScroll, 50);
        }, { passive: true });

        // Mobile-friendly smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - (window.innerWidth < 768 ? 50 : 70);
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Mobile-optimized counter animation
        function animateCounters() {
            const counters = document.querySelectorAll('.counter');
            if (!counters.length) return;

            const speed = window.innerWidth < 768 ? 100 : 200; // Faster on mobile

            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/\D/g, '');
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment).toLocaleString();
                    requestAnimationFrame(() => animateCounters());
                } else {
                    counter.innerText = target.toLocaleString();
                }
            });
        }

        // Mobile-friendly intersection observer
        const achievementsSection = document.getElementById('achievements');
        if (achievementsSection) {
            const observerOptions = {
                threshold: window.innerWidth < 768 ? 0.1 : 0.5
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            observer.observe(achievementsSection);
        }

        // Touch-optimized gallery
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            // Add touch support
            item.addEventListener('touchstart', function(e) {
                this.classList.add('touching');
            }, { passive: true });
            
            item.addEventListener('touchend', function(e) {
                this.classList.remove('touching');
            }, { passive: true });
            
            // Click handler remains for desktop
            item.addEventListener('click', function(e) {
                if (window.innerWidth > 768 || this.classList.contains('touching')) {
                    // Lightbox implementation would go here
                    console.log('Gallery item activated');
                }
            });
        });

        // Mobile form optimization
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            // Prevent zoom on input focus
            // const inputs = contactForm.querySelectorAll('input, textarea');
            // inputs.forEach(input => {
            //     input.addEventListener('focus', function() {
            //         window.scrollTo(0, 0);
            //         document.body.style.zoom = "100%";
            //     });
            // });

            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Mobile-friendly validation
                const name = document.getElementById('name')?.value.trim();
                const email = document.getElementById('email')?.value.trim();
                const message = document.getElementById('message')?.value.trim();
                
                if (!name || !email || !message) {
                    alert('Please fill all required fields');
                    return;
                }
                
                // Success handling
                const successMsg = document.getElementById('formSuccess');
                if (successMsg) {
                    successMsg.classList.remove('d-none');
                    contactForm.reset();
                    
                    // Scroll to success message on mobile
                    if (window.innerWidth < 768) {
                        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                    
                    setTimeout(() => {
                        successMsg.classList.add('d-none');
                    }, 5000);
                }
            });
        }

    } catch (error) {
        console.error('JavaScript error:', error);
    }
    // Back to Top Button Functionality
const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
            backToTopButton.classList.remove('animate__fadeOut');
            backToTopButton.classList.add('animate__fadeIn');
        } else {
            backToTopButton.classList.remove('active');
            backToTopButton.classList.remove('animate__fadeIn');
            backToTopButton.classList.add('animate__fadeOut');
        }
    });

    // Smooth scroll to top when clicked
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add bounce animation on click
        this.classList.add('animate__bounce');
        
        // Scroll to top with smooth behavior
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Remove bounce animation after it completes
        setTimeout(() => {
            this.classList.remove('animate__bounce');
        }, 1000);
    });

    // Hide button initially
    backToTopButton.classList.add('animate__fadeOut');
}
});