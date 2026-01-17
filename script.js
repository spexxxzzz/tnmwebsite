/**
 * Tensor & Maxwell - AI Supervision Layer
 * Interactive animations and effects
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavigation();
    initSupervisorAnimation();
});

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger children animations
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('animate-in');
                });
            }
        });
    }, observerOptions);

    // Observe sections (except hero)
    document.querySelectorAll('section:not(.hero)').forEach(section => {
        section.classList.add('animate-section');
        observer.observe(section);
    });

    // Add animate-child class to cards
    document.querySelectorAll('.stat-card, .check-item, .decision-card, .diff-card, .industry-card').forEach(el => {
        el.classList.add('animate-child');
    });
}

/**
 * Navigation enhancements
 */
function initNavigation() {
    const nav = document.querySelector('.nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Scroll effect on nav
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            nav.style.background = 'rgba(10, 10, 11, 0.95)';
        } else {
            nav.style.boxShadow = 'none';
            nav.style.background = 'rgba(10, 10, 11, 0.8)';
        }
    });

    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            mobileMenuBtn.classList.toggle('active');
        });

        // Add mobile styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .nav-links.mobile-open {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(10, 10, 11, 0.98);
                    padding: 1.5rem;
                    gap: 1rem;
                    border-bottom: 1px solid var(--border-color);
                    animation: slideDown 0.3s ease;
                }
                
                .nav-links.mobile-open a {
                    padding: 0.75rem 0;
                }
                
                .mobile-menu-btn.active span:first-child {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .mobile-menu-btn.active span:last-child {
                    transform: rotate(-45deg) translate(5px, -5px);
                }
                
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                navLinks?.classList.remove('mobile-open');
                mobileMenuBtn?.classList.remove('active');
            }
        });
    });
}

/**
 * Supervisor diagram animation
 */
function initSupervisorAnimation() {
    const supervisorCore = document.querySelector('.supervisor-core');
    const decisionItems = document.querySelectorAll('.decision-item');
    
    if (!supervisorCore || decisionItems.length === 0) return;
    
    // Cycle through decision highlights
    let currentDecision = 0;
    const decisions = Array.from(decisionItems);
    
    function highlightDecision() {
        // Remove highlight from all
        decisions.forEach(d => d.style.opacity = '0.5');
        
        // Highlight current
        decisions[currentDecision].style.opacity = '1';
        decisions[currentDecision].style.transform = 'scale(1.05)';
        
        // Reset previous
        setTimeout(() => {
            decisions[currentDecision].style.transform = 'scale(1)';
        }, 1500);
        
        // Move to next
        currentDecision = (currentDecision + 1) % decisions.length;
    }
    
    // Start cycling
    decisions.forEach(d => {
        d.style.transition = 'all 0.3s ease';
        d.style.opacity = '0.5';
    });
    
    highlightDecision();
    setInterval(highlightDecision, 2000);
    
    // Interactive hover on diagram
    const diagram = document.querySelector('.supervisor-diagram');
    if (diagram) {
        diagram.addEventListener('mouseenter', () => {
            decisions.forEach(d => d.style.opacity = '1');
        });
        
        diagram.addEventListener('mouseleave', () => {
            decisions.forEach((d, i) => {
                d.style.opacity = i === currentDecision ? '1' : '0.5';
            });
        });
    }
}

/**
 * Parallax effect for background elements
 */
function initParallax() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    if (orbs.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            orbs.forEach((orb, index) => {
                const speed = 0.1 + (index * 0.05);
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}
