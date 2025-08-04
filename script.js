document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Typing Effect
    const typedTextSpan = document.querySelector('#typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    const textArray = ['Software Developer', 'Java Programmer', 'Web Developer', 'Machine Learning Enthusiast'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            } else {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex+1);
            }
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            // erase
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            } else {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            }
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            // type
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    if(textArray.length) setTimeout(type, newTextDelay + 250);
    
    // Scroll Animation
    const scrollElements = document.querySelectorAll('.js-scroll');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const elementOutofView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop > (window.innerHeight || document.documentElement.clientHeight)
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else if (elementOutofView(el)) {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach((link) => {
                    link.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const formElements = contactForm.elements;
            let isValid = true;
            
            // Simple validation
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].required && !formElements[i].value) {
                    isValid = false;
                    formElements[i].classList.add('error');
                } else {
                    formElements[i].classList.remove('error');
                }
            }
            
            if (isValid) {
                // Reset form
                contactForm.reset();
                
                // Show success message (you would implement this)
                alert('Thank you for your message! I will get back to you soon.');
            }
        });
    }
    
    // Initialize skill bars animation
    const skillBars = document.querySelectorAll('.skill-level');
    
    const animateSkillBars = () => {
        skillBars.forEach((bar) => {
            const targetWidth = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 500);
        });
    };
    
    // Trigger skill bars animation when about section is in view
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(aboutSection);
    }
});

// Add burger menu toggle animation
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    if (burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('toggle');
        });
    }
});

// Add CSS for burger toggle animation
const style = document.createElement('style');
style.textContent = `
.burger.toggle .line1 {
    transform: rotate(-45deg) translate(-5px, 6px);
}

.burger.toggle .line2 {
    opacity: 0;
}

.burger.toggle .line3 {
    transform: rotate(45deg) translate(-5px, -6px);
}

.form-group input.error,
.form-group textarea.error {
    box-shadow: 0 0 0 2px #ff6b6b;
}

.js-scroll {
    opacity: 0;
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.js-scroll.scrolled {
    opacity: 1;
    transform: translateY(0);
}

.js-scroll--from-left {
    transform: translateX(-50px);
}

.js-scroll--from-right {
    transform: translateX(50px);
}

.js-scroll--from-bottom {
    transform: translateY(50px);
}
`;

document.head.appendChild(style);