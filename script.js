document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor-glow');

    // Make sure the cursor follows the mouse
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add interactive hover effect for links and buttons
    const interactiveElements = document.querySelectorAll('a, .btn-connect, .name, .circle-image-placeholder, .star-icon-container, .dial-skill, .tool-pill');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
            cursor.style.backgroundColor = 'rgba(255, 42, 42, 0.5)';
            cursor.style.boxShadow = '0 0 30px 15px rgba(255, 42, 42, 0.6)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--accent-red)';
            cursor.style.boxShadow = '0 0 20px 10px rgba(255, 42, 42, 0.5), 0 0 40px 20px rgba(255, 42, 42, 0.3)';
        });
    });

    // Add click effect
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Typing Effect for About Section
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["Full Stack Developer", "Frontend Developer", "MERN Stack Developer", "UI Developer"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if(textArray.length) setTimeout(type, newTextDelay + 250);

    // 3D Interactive Floating Effect for Project Cards
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            // Disable 3D tilt if the card is currently flipped
            if (card.classList.contains('is-flipped')) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.boxShadow = `${-rotateY}px ${rotateX}px 20px rgba(139, 0, 0, 0.2)`;

            // Move the internal glow to follow the mouse
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
                glow.style.transform = `translate(-50%, -50%)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.boxShadow = `none`;
            
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.left = `50%`;
                glow.style.top = `50%`;
            }
        });
    });

    // Animate skill progress bars when they scroll into view
    const skillMeters = document.querySelectorAll('.skill-meter');

    const meterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.3 });

    skillMeters.forEach(meter => meterObserver.observe(meter));
});
