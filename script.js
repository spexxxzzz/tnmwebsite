/**
 * Tensor & Maxwell Website
 * Interactive animations and effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initDataFlowVisualization();
    initScrollAnimations();
    initNavigation();
    initParallax();
});

/**
 * Pipeline Visualization
 * Creates flowing particles in the data pipeline
 */
function initDataFlowVisualization() {
    const flowLeftParticles = document.getElementById('flow-left-particles');
    const flowRightParticles = document.getElementById('flow-right-particles');
    
    function createFlowParticle(container, isRight = false) {
        if (!container) return;
        
        const particle = document.createElement('div');
        particle.className = 'flow-particle';
        
        // Random vertical position
        const yOffset = -15 + Math.random() * 30;
        particle.style.top = `calc(50% + ${yOffset}px)`;
        
        // Color based on direction
        if (isRight) {
            particle.style.background = '#10b981';
            particle.style.boxShadow = '0 0 10px #10b981';
            particle.style.left = '0';
            particle.style.animation = 'flowRight 1.5s ease-in-out forwards';
        } else {
            particle.style.background = '#3b82f6';
            particle.style.boxShadow = '0 0 10px #3b82f6';
            particle.style.left = '0';
            particle.style.animation = 'flowLeft 1.5s ease-in-out forwards';
        }
        
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1500);
    }
    
    // Add keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flowLeft {
            0% { left: 0; opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
        }
        @keyframes flowRight {
            0% { left: 0; opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Spawn particles
    if (flowLeftParticles) {
        setInterval(() => createFlowParticle(flowLeftParticles, false), 300);
    }
    if (flowRightParticles) {
        setInterval(() => createFlowParticle(flowRightParticles, true), 300);
    }
}

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

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-section');
        observer.observe(section);
    });

    // Add animate-child class to cards
    document.querySelectorAll('.problem-card, .use-case-card, .feature, .module, .step').forEach(el => {
        el.classList.add('animate-child');
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-child {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate-child.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Keep hero visible */
        .hero {
            opacity: 1 !important;
            transform: none !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Navigation enhancements
 */
function initNavigation() {
    const nav = document.querySelector('.nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Scroll effect on nav
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
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
                    background: rgba(255, 255, 255, 0.98);
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
 * Subtle parallax effects
 */
function initParallax() {
    const heroGrid = document.querySelector('.hero-grid');
    
    if (heroGrid) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }

    // Mouse move effect on pipeline
    const pipeline = document.querySelector('.pipeline-viz');
    
    if (pipeline) {
        pipeline.addEventListener('mousemove', (e) => {
            const rect = pipeline.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / 150;
            const deltaY = (e.clientY - centerY) / 150;
            
            pipeline.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
        });

        pipeline.addEventListener('mouseleave', () => {
            pipeline.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
            pipeline.style.transition = 'transform 0.5s ease';
        });

        pipeline.addEventListener('mouseenter', () => {
            pipeline.style.transition = 'transform 0.1s ease';
        });
    }
}

/**
 * Typing effect for readout values (optional enhancement)
 */
function initReadoutAnimation() {
    const readouts = document.querySelectorAll('.readout-item');
    
    readouts.forEach(readout => {
        const originalText = readout.textContent;
        
        setInterval(() => {
            // Simulate value fluctuation
            if (readout.textContent.includes('kHz')) {
                const newValue = (1.1 + Math.random() * 0.2).toFixed(1);
                readout.innerHTML = `<span class="readout-label">FREQ:</span> ${newValue}kHz`;
            } else if (readout.textContent.includes('V')) {
                const newValue = (3.0 + Math.random() * 0.4).toFixed(1);
                readout.innerHTML = `<span class="readout-label">AMP:</span> ${newValue}V`;
            }
        }, 2000);
    });
}

