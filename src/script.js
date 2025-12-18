/* ---- Loading Screen Logic ---- */
const loader = document.getElementById('loader-wrapper');
const siteContent = document.getElementById('site-content'); // Get the site content wrapper
const minLoadTime = 1000;
const pageLoadStartTime = Date.now();

window.addEventListener('load', () => {
    if (loader) {
        const timeElapsed = Date.now() - pageLoadStartTime;
        const timeToWait = Math.max(0, minLoadTime - timeElapsed);

        setTimeout(() => {
            // Start hiding the loader
            loader.classList.add('hidden');
            
            // ADD THIS LINE to start showing the site content
            if (siteContent) {
                siteContent.classList.add('loaded');
            }

            // Optional: Completely remove the loader from the DOM after the transition ends
            loader.addEventListener('transitionend', () => {
                loader.style.display = 'none';
            }, { once: true });
        }, timeToWait);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    /* ---- Scroll-Down Arrow Animation ---- */
    const scrollArrow = document.querySelector('.scroll-down-arrow');

    window.addEventListener('scroll', () => {
        // If user has scrolled more than 50px down
        if (window.scrollY > 50) {
            scrollArrow.classList.add('fade-out');
        } else {
            // If user scrolls back to the top
            scrollArrow.classList.remove('fade-out');
        }
    });

    /* ---- GPA Count-Up Animation ---- */
    const gpaElement = document.getElementById('gpa-value');
    const finalGpa = parseFloat(gpaElement.dataset.gpa); // Get the final GPA from the data attribute

    // Function to start the animation
    const startCountUp = () => {
        let start = 0;
        const duration = 2000; // Animation duration in milliseconds
        const range = finalGpa - start;
        let current = start;
        const increment = finalGpa / (duration / 10); // Calculate increment
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalGpa) {
                clearInterval(timer);
                gpaElement.textContent = `${finalGpa.toFixed(2)} / 4.0`; // Ensure the final value is exact
            } else {
                gpaElement.textContent = `${current.toFixed(2)} / 4.0`;
            }
        }, 10); // Update every 10ms
    };

    // Set the initial text
    gpaElement.textContent = '0.00 / 4.0';

    // Use IntersectionObserver to trigger the animation when the element is visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCountUp();
            observer.unobserve(gpaElement); // Stop observing after animation starts
        }
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    // Start observing the GPA element
    observer.observe(gpaElement);

    /* ---- Accordion Dropdown for Experience Section ---- */
    const accordionToggles = document.querySelectorAll('.accordion-toggle');

    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            // Close all other accordions before opening a new one
            document.querySelectorAll('.accordion-content.active').forEach(activeContent => {
                if (activeContent !== content) {
                    activeContent.classList.remove('active');
                    activeContent.style.maxHeight = null;
                    activeContent.previousElementSibling.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle the clicked accordion
            if (!isExpanded) {
                toggle.setAttribute('aria-expanded', 'true');
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px"; // Set max-height for smooth transition
            } else {
                toggle.setAttribute('aria-expanded', 'false');
                content.classList.remove('active');
                content.style.maxHeight = null;
            }
        });
    });

    /* ---- Copy Email to Clipboard ---- */
    const emailLink = document.getElementById('email-address');
    const copyPopup = document.getElementById('copy-popup');

    emailLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent any default link behavior
        
        const email = emailLink.textContent; // Get the email text

        // Use the modern Navigator API to copy to clipboard
        navigator.clipboard.writeText(email).then(() => {
            // Show the popup
            copyPopup.classList.add('show');

            // Hide the popup after 2 seconds
            setTimeout(() => {
                copyPopup.classList.remove('show');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err); // Error handling
        });
    });
});

