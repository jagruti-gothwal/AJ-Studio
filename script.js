/**
 * AJ Studio - Premium Interactions (Lenis & GSAP)
 */

document.addEventListener("DOMContentLoaded", () => {
    // --------------------------------------------------------
    // 1. Footer Year & Mobile Menu Sync
    // --------------------------------------------------------
    document.getElementById('year').textContent = new Date().getFullYear();

    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // --------------------------------------------------------
    // 2. Lenis Smooth Scrolling Setup
    // --------------------------------------------------------
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    gsap.registerPlugin(ScrollTrigger);
    
    // --------------------------------------------------------
    // 3. Custom Cursor (Desktop Only)
    // --------------------------------------------------------
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');

    if (window.matchMedia("(pointer: fine)").matches) {
        // Move Cursor
        window.addEventListener('mousemove', (e) => {
            gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0, ease: 'none' });
            gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' });
        });

        // Interactive states
        const interactives = document.querySelectorAll('a, button, input, textarea, select, .gs-card');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(ring, { width: 45, height: 45, borderColor: 'rgba(94, 106, 210, 0.8)', duration: 0.2 });
                gsap.to(dot, { scale: 0, duration: 0.2 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(ring, { width: 32, height: 32, borderColor: 'rgba(255,255,255,0.4)', duration: 0.2 });
                gsap.to(dot, { scale: 1, duration: 0.2 });
            });
        });
    }

    // --------------------------------------------------------
    // 4. Navbar Scroll Effect
    // --------------------------------------------------------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --------------------------------------------------------
    // 5. SplitType text splitting for Animation
    // --------------------------------------------------------
    const splitTexts = document.querySelectorAll('.split-text');
    splitTexts.forEach(text => {
        new SplitType(text, { types: 'lines, words', lineClass: 'line' });
    });

    // --------------------------------------------------------
    // 6. GSAP Animations Main sequence
    // --------------------------------------------------------

    // A. Navbar load-in
    gsap.from('.gs-reveal', {
        y: -20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.1
    });

    // B. Hero load-in Sequence
    const tlHero = gsap.timeline({ delay: 0.3 });

    tlHero.from('.hero .line .word', {
        y: 60, opacity: 0, duration: 0.8, stagger: 0.05, ease: "power4.out"
    })
    .from('.hero .gs-fade', {
        y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out"
    }, "-=0.4")
    .from('.hero-visual .gs-scale', {
        scale: 0.9, opacity: 0, duration: 1.2, ease: "power3.out"
    }, "-=0.8");

    // Floating animation for badges
    gsap.to('.floating-badge', {
        y: -15, duration: 2, ease: "sine.inOut", stagger: { each: 0.2, from: "random" }, yoyo: true, repeat: -1
    });

    // C. ScrollTrigger Reveals (Text & General Fades)
    
    // Headers Text Reveal Config
    document.querySelectorAll('section .split-text').forEach(triggerElement => {
        gsap.from(triggerElement.querySelectorAll('.word'), {
            scrollTrigger: {
                trigger: triggerElement,
                start: "top 85%",
            },
            y: 50, opacity: 0, duration: 0.8, stagger: 0.03, ease: "power4.out"
        });
    });

    // General fade-ups (About text, contact details)
    document.querySelectorAll('.gs-fade, .gs-fade-up').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 85%" },
            y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out"
        });
    });

    // Section specific left/right fades
    document.querySelectorAll('.gs-fade-left').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 85%" },
            x: -40, opacity: 0, duration: 0.8, ease: "power3.out"
        });
    });
    document.querySelectorAll('.gs-fade-right').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 85%" },
            x: 40, opacity: 0, duration: 0.8, ease: "power3.out"
        });
    });

    // D. Grid Cards Stagger Reveal (Services & Process)
    document.querySelectorAll('.stag-cards').forEach(container => {
        gsap.from(container.querySelectorAll('.gs-card'), {
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
            },
            y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out"
        });
    });

    // E. Premium Portfolio Image Reveals
    document.querySelectorAll('.gs-img-reveal').forEach(wrapper => {
        
        // Unclip animation
        gsap.to(wrapper, {
            scrollTrigger: {
                trigger: wrapper,
                start: "top 85%",
            },
            clipPath: 'inset(0% 0 0 0)',
            opacity: 1,
            duration: 1.2,
            ease: "power4.inOut"
        });

        // Inner image subtle zoom out during reveal
        const img = wrapper.querySelector('img');
        gsap.from(img, {
            scrollTrigger: {
                trigger: wrapper,
                start: "top 85%",
            },
            scale: 1.3,
            duration: 1.5,
            ease: "power3.out"
        });
    });

    // F. Smooth Parallax effects on images
    document.querySelectorAll('[data-speed]').forEach(elem => {
        const speed = parseFloat(elem.getAttribute('data-speed'));
        gsap.to(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: (i, target) => -1 * (target.offsetHeight * (1 - speed)),
            ease: 'none'
        });
    });

    // --------------------------------------------------------
    // 7. Form Submission Mocking
    // --------------------------------------------------------
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"] span');
        const btnParent = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending Details...';
        btnParent.disabled = true;
        
        setTimeout(() => {
            btn.textContent = 'Message Received ✨';
            btnParent.style.backgroundColor = '#10b981';
            btnParent.style.color = '#fff';
            
            form.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btnParent.disabled = false;
                btnParent.style.backgroundColor = '';
                btnParent.style.color = '';
            }, 3000);
        }, 1500);
    });
});
