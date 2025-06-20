// ===== PORTFOLIO INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();

    // Initialize AOS with settings
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 0
    });

    // Initialize all functionality
    initCustomCursor();
    initProfileCircle();
    initScrollEffects();
    initAnimations();

    // Initialize project filters after a short delay to ensure DOM is ready
    setTimeout(() => {
        initProjectFilters();
    }, 100);
});

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');

    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            // Hide loading screen after completion
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 600);
            }, 500);
        }
        loadingProgress.style.width = progress + '%';
    }, 100);
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (!cursor || !cursorFollower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .btn');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursorFollower.style.transform = 'scale(1.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// ===== PROFILE CIRCLE =====
function initProfileCircle() {
    const profileCircle = document.querySelector('.profile-circle');

    if (profileCircle) {
        // Add click interaction to scroll to top
        profileCircle.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Add hover effect
        profileCircle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });

        profileCircle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        // Add scroll effect to profile circle
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.02;

            if (scrolled > 100) {
                profileCircle.style.transform = `translateY(${rate}px) scale(0.9)`;
                profileCircle.style.opacity = '0.8';
            } else {
                profileCircle.style.transform = 'translateY(0) scale(1)';
                profileCircle.style.opacity = '1';
            }
        });
    }
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Scroll to top button
    const scrollToTopBtn = createScrollToTopButton();

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.style.display = 'flex';
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 500) {
                    scrollToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });

    // Parallax effect for hero elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');

        if (heroVisual) {
            const rate = scrolled * -0.3;
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add smooth scrolling to all internal links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-gradient);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        transition: var(--transition-normal);
        box-shadow: var(--shadow-glow);
        opacity: 0;
        font-size: 1rem;
    `;

    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-2px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });

    document.body.appendChild(button);
    return button;
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Trigger counter animation for stats
                if (entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }


            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.hero-visual, .hero-stats, .profile-image-container, .about-text, .skills-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}



// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach((counter, index) => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const is247 = target.includes('24/7');
        const hasPlus = target.includes('+');

        let finalValue;
        let suffix = '';

        // Add staggered delay
        const delay = index * 200;

        setTimeout(() => {
            if (is247) {
                // Special handling for 24/7
                animateSpecialCounter(counter, '24/7');
                return;
            } else if (isPercentage) {
                finalValue = parseInt(target);
                suffix = '%';
            } else if (hasPlus) {
                finalValue = parseInt(target);
                suffix = '+';
            } else {
                finalValue = parseInt(target);
            }

            animateCounter(counter, 0, finalValue, suffix, 2000);
        }, delay);
    });
}

function animateCounter(element, start, end, suffix, duration) {
    let startTime = null;
    element.classList.add('counting');

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);

        element.textContent = current + suffix;

        // Add pulse effect during counting
        if (progress < 1) {
            // Add subtle pulse every few frames
            if (Math.floor(timestamp / 100) % 2 === 0) {
                element.style.transform = 'scale(1.02)';
            } else {
                element.style.transform = 'scale(1)';
            }
            requestAnimationFrame(step);
        } else {
            element.textContent = end + suffix;
            element.style.transform = 'scale(1)';
            element.classList.remove('counting');

            // Final celebration pulse
            element.style.animation = 'counterComplete 0.6s ease-out';
            setTimeout(() => {
                element.style.animation = '';
            }, 600);
        }
    }

    requestAnimationFrame(step);
}

function animateSpecialCounter(element, finalText) {
    const chars = finalText.split('');
    let currentIndex = 0;

    element.textContent = '';

    function addChar() {
        if (currentIndex < chars.length) {
            element.textContent += chars[currentIndex];
            currentIndex++;
            setTimeout(addChar, 150);
        }
    }

    setTimeout(addChar, 500);
}

// ===== PROJECT FILTERS =====
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length === 0 || projectItems.length === 0) {
        console.warn('Filter buttons or project items not found');
        return;
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // First, hide all items immediately
            projectItems.forEach(item => {
                item.style.animation = '';
                item.classList.add('hidden');
            });

            // Then show matching items with animation after a short delay
            setTimeout(() => {
                let visibleIndex = 0;
                projectItems.forEach(item => {
                    const category = item.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        // Show item
                        item.classList.remove('hidden');
                        item.style.animation = `fadeInUp 0.6s ease-out ${visibleIndex * 0.1}s both`;
                        visibleIndex++;
                    }
                });
            }, 50);
        });
    });
}

// ===== PROJECT HOVER EFFECTS =====
function initProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== RESPONSIVE ENHANCEMENTS =====
function initResponsiveFeatures() {
    // Handle viewport height for mobile browsers
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setViewportHeight();
    window.addEventListener('resize', debounce(setViewportHeight, 250));
    window.addEventListener('orientationchange', function() {
        setTimeout(setViewportHeight, 100);
    });

    // Touch device detection and optimizations
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');

        // Improve touch interactions
        const touchElements = document.querySelectorAll('.btn, .social-link');

        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });

            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }, { passive: true });
        });
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', function(e) {
    // Scroll to top with Home key
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Scroll to bottom with End key
    if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
});

// Initialize responsive features
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initResponsiveFeatures();
    }, 100);
});

// ===== ANIMATION STYLES =====
const style = document.createElement('style');
style.textContent = `
    .fade-out {
        opacity: 0 !important;
        visibility: hidden;
    }
    
    .touch-device .cursor,
    .touch-device .cursor-follower {
        display: none;
    }
`;
document.head.appendChild(style);
