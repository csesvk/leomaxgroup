/* ===================================================================
 * Animation Controller for Flare Website
 * ------------------------------------------------------------------- */

(function($) {
    "use strict";

    // Scroll Reveal Animation
    const scrollReveal = function() {
        const reveals = document.querySelectorAll('.scroll-reveal');
        
        const revealOnScroll = function() {
            const windowHeight = window.innerHeight;
            const elementVisible = 150;
            
            reveals.forEach(function(element) {
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('revealed');
                }
            });
        };
        
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Check on load
    };

    // Staggered Animation for Lists
    const staggeredAnimation = function() {
        const animateList = function(selector, animationClass, delay = 100) {
            const items = document.querySelectorAll(selector);
            items.forEach(function(item, index) {
                setTimeout(function() {
                    item.classList.add(animationClass);
                }, index * delay);
            });
        };

        // Animate service items
        setTimeout(function() {
            animateList('.item-service', 'animate-fade-in-up', 200);
        }, 500);

        // Animate process items
        setTimeout(function() {
            animateList('.item-process', 'animate-fade-in-left', 150);
        }, 800);

        // Animate portfolio items
        setTimeout(function() {
            animateList('.folio-item', 'animate-scale-in', 100);
        }, 1000);
    };

    // Parallax Effect for Hero Background
    const parallaxEffect = function() {
        const hero = document.querySelector('.s-hero__bg');
        if (!hero) return;

        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    };

    // Typing Animation for Hero Text
    const typingAnimation = function() {
        const textElement = document.querySelector('.s-hero h1');
        if (!textElement) return;

        const text = textElement.textContent;
        textElement.textContent = '';
        textElement.style.opacity = '1';

        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                textElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        setTimeout(typeWriter, 1000);
    };

    // Counter Animation
    const counterAnimation = function() {
        const counters = document.querySelectorAll('.stats-tabs a');
        
        const animateCounter = function(counter) {
            const target = parseInt(counter.textContent.replace(/,/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = function() {
                if (current < target) {
                    current += increment;
                    counter.firstChild.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.firstChild.textContent = target.toLocaleString();
                }
            };
            
            updateCounter();
        };

        // Trigger counter animation when in view
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(function(counter) {
            observer.observe(counter);
        });
    };

    // Smooth Page Transitions
    const pageTransitions = function() {
        // Add fade-in effect to body
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        window.addEventListener('load', function() {
            document.body.style.opacity = '1';
        });

        // Smooth transitions for internal links
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // Mouse Trail Effect
    const mouseTrail = function() {
        const trail = [];
        const trailLength = 10;

        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'mouse-trail-dot';
            dot.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(1, 174, 240, ${1 - i / trailLength});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: all 0.1s ease;
            `;
            document.body.appendChild(dot);
            trail.push(dot);
        }

        document.addEventListener('mousemove', function(e) {
            trail.forEach(function(dot, index) {
                setTimeout(function() {
                    dot.style.left = e.clientX + 'px';
                    dot.style.top = e.clientY + 'px';
                }, index * 10);
            });
        });
    };

    // Floating Elements Animation
    const floatingElements = function() {
        const floatingItems = document.querySelectorAll('.service-icon, .folio-item__thumb');
        
        floatingItems.forEach(function(item, index) {
            item.style.animationDelay = (index * 0.2) + 's';
            item.classList.add('hover-float');
        });
    };

    // Text Reveal Animation
    const textRevealAnimation = function() {
        const textElements = document.querySelectorAll('.display-1, .lead');
        
        textElements.forEach(function(element) {
            const text = element.textContent;
            const words = text.split(' ');
            element.innerHTML = '';
            
            words.forEach(function(word, index) {
                const span = document.createElement('span');
                span.textContent = word + ' ';
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                span.style.transition = `all 0.5s ease ${index * 0.1}s`;
                element.appendChild(span);
            });
            
            // Trigger animation when in view
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const spans = entry.target.querySelectorAll('span');
                        spans.forEach(function(span) {
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                        });
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    };

    // Loading Screen Enhancement
    const enhancedPreloader = function() {
        const preloader = document.getElementById('preloader');
        const loader = document.getElementById('loader');
        
        if (preloader && loader) {
            // Add progress bar
            const progressBar = document.createElement('div');
            progressBar.style.cssText = `
                position: absolute;
                bottom: 50px;
                left: 50%;
                transform: translateX(-50%);
                width: 200px;
                height: 2px;
                background: rgba(255,255,255,0.2);
                border-radius: 1px;
                overflow: hidden;
            `;
            
            const progress = document.createElement('div');
            progress.style.cssText = `
                width: 0%;
                height: 100%;
                background: #01aef0;
                transition: width 0.3s ease;
            `;
            
            progressBar.appendChild(progress);
            preloader.appendChild(progressBar);
            
            // Simulate loading progress
            let progressValue = 0;
            const progressInterval = setInterval(function() {
                progressValue += Math.random() * 15;
                if (progressValue >= 100) {
                    progressValue = 100;
                    clearInterval(progressInterval);
                }
                progress.style.width = progressValue + '%';
            }, 100);
        }
    };

    // Initialize all animations
    const initAnimations = function() {
        scrollReveal();
        staggeredAnimation();
        parallaxEffect();
        typingAnimation();
        counterAnimation();
        pageTransitions();
        mouseTrail();
        floatingElements();
        textRevealAnimation();
        enhancedPreloader();
    };

    // Initialize when DOM is ready
    $(document).ready(function() {
        initAnimations();
    });

    // Re-initialize on window resize
    $(window).on('resize', function() {
        // Reinitialize responsive animations
        scrollReveal();
    });

})(jQuery);