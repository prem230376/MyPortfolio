document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect
    const typewriterTexts = [
        "Full Stack Developer"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    const typewriterElement = document.getElementById('typewriter');

    function typeWriter() {
        const currentText = typewriterTexts[textIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typewriterTexts.length;
            typingSpeed = 500; // Pause before starting next
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Initialize typewriter
    setTimeout(typeWriter, 1000);

    // Initialize background elements
    createBackgroundElements();

    // Initialize skill bars
    initializeSkillBars();

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Create dynamic background elements
    function createBackgroundElements() {
        const bgElementsContainer = document.querySelectorAll('.bg-elements');

        bgElementsContainer.forEach(container => {
            // Add more elements for a richer background
            for (let i = 0; i < 8; i++) {
                const element = document.createElement('div');
                element.classList.add('bg-element');

                const size = Math.random() * 100 + 20;
                const top = Math.random() * 100;
                const left = Math.random() * 100;
                const delay = Math.random() * 15;

                element.style.width = `${size}px`;
                element.style.height = `${size}px`;
                element.style.top = `${top}%`;
                element.style.left = `${left}%`;
                element.style.animationDelay = `${delay}s`;

                container.appendChild(element);
            }
        });
    }

    // Initialize skill bars animation
    function initializeSkillBars() {
        const skillLevels = document.querySelectorAll('.skill-level');

        // Set initial width to 0
        skillLevels.forEach(skill => {
            skill.style.width = '0';
        });

        // Animate skill bars when about section comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillLevels.forEach(skill => {
                        const level = skill.getAttribute('data-level');
                        setTimeout(() => {
                            skill.style.width = level + '%';
                        }, 300);
                    });
                }
            });
        }, {
            threshold: 0.5
        });

        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            observer.observe(aboutSection);
        }
    }
});