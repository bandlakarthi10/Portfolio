document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Tab Navigation & Hash Management ---
    const navLinks = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("main section");
    const logoLink = document.getElementById("header-logo");

    function showSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        // Hide all sections
        sections.forEach(section => {
            section.classList.remove("visible");
        });

        // Show target section
        targetSection.classList.add("visible");

        // Update active nav link
        navLinks.forEach(link => {
            const href = link.getAttribute("href").substring(1);
            if (href === targetId) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        // Special behavior: Trigger Skills progress bar animation
        if (targetId === "Skills") {
            animateProgressBars();
        }

        // Smooth scroll to top of page (since header is sticky)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Intercept navbar clicks
    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            history.pushState(null, null, `#${targetId}`);
            showSection(targetId);
        });
    });

    // Intercept logo click
    if (logoLink) {
        logoLink.addEventListener("click", e => {
            e.preventDefault();
            history.pushState(null, null, "#Home");
            showSection("Home");
        });
    }

    // Intercept Home CTA buttons and other in-page links
    document.addEventListener("click", e => {
        const anchor = e.target.closest("a");
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
            e.preventDefault();
            const targetId = href.substring(1);
            history.pushState(null, null, `#${targetId}`);
            showSection(targetId);
        }
    });

    // Handle initial load and back/forward browser button navigation
    function handleRouting() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            showSection(hash);
        } else {
            showSection("Home");
        }
    }

    window.addEventListener("popstate", handleRouting);
    handleRouting(); // Call on load


    // --- 2. Roles Typing Animation ---
    const roles = [
        "Full Stack Developer",
        "AI Developer",
        "ServiceNow Developer",
        "Frontend Engineer",
        "Backend Developer"
    ];
    const roleTextEl = document.getElementById("role-text");
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeRole() {
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            // Remove character
            roleTextEl.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50; // Erase faster
        } else {
            // Add character
            roleTextEl.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100; // Standard typing speed
        }

        // Handle states
        if (!isDeleting && currentCharIndex === currentRole.length) {
            // Full role typed, pause before deleting
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && currentCharIndex === 0) {
            // Role completely erased, switch to next role
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typingSpeed = 500; // Brief pause before typing next
        }

        setTimeout(typeRole, typingSpeed);
    }

    if (roleTextEl) {
        typeRole();
    }


    // --- 3. Interactive Progress Bars Animation ---
    function animateProgressBars() {
        const fills = document.querySelectorAll(".progress-bar-fill");
        fills.forEach(fill => {
            // Temporarily reset to 0
            const targetWidth = fill.style.width;
            fill.style.width = "0%";
            
            // Force redraw/reflow
            fill.offsetHeight; 
            
            // Set back to target to animate
            fill.style.width = targetWidth;
        });
    }


    // --- 4. Skills Card Filtering ---
    const skillFilterButtons = document.querySelectorAll(".skill-filter-btn");
    const skillCards = document.querySelectorAll(".skill-card-new");

    skillFilterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Toggle active buttons
            skillFilterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.getAttribute("data-category");

            // Filter cards
            skillCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                
                // Reset card styling
                card.style.display = "flex";
                card.style.opacity = "1";
                card.style.transform = "scale(1)";

                if (category !== "all" && cardCategory !== category) {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.8)";
                    // Timeout to match transition and hide element
                    setTimeout(() => {
                        if (btn.classList.contains("active") && btn.getAttribute("data-category") === category) {
                            card.style.display = "none";
                        }
                    }, 200);
                }
            });
        });
    });


    // --- 5. Projects Card Filtering ---
    const projectFilterButtons = document.querySelectorAll(".filter-btn[data-filter]");
    const projectCards = document.querySelectorAll(".project-card-new");

    projectFilterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Toggle active classes
            projectFilterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");

                card.style.display = "flex";
                card.style.opacity = "1";
                card.style.transform = "scale(1)";

                if (filter !== "all" && category !== filter) {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        if (btn.classList.contains("active") && btn.getAttribute("data-filter") === filter) {
                            card.style.display = "none";
                        }
                    }, 250);
                }
            });
        });
    });


    // --- 6. Gallery Filtering ---
    const galleryFilterButtons = document.querySelectorAll(".filter-btn[data-gallery-filter]");
    const galleryCards = document.querySelectorAll(".gallery-card");

    galleryFilterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Toggle active classes
            galleryFilterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-gallery-filter");

            galleryCards.forEach(card => {
                const category = card.getAttribute("data-gallery-category");

                card.style.display = "block";
                card.style.opacity = "1";
                card.style.transform = "scale(1)";

                if (filter !== "all" && category !== filter) {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.9)";
                    setTimeout(() => {
                        if (btn.classList.contains("active") && btn.getAttribute("data-gallery-filter") === filter) {
                            card.style.display = "none";
                        }
                    }, 250);
                }
            });
        });
    });


    // --- 7. Contact Form Handling ---
    const contactForm = document.getElementById("contact-form");
    const formSubmitBtn = document.getElementById("form-submit-btn");
    const statusMsg = document.getElementById("form-status-msg");

    if (contactForm) {
        contactForm.addEventListener("submit", e => {
            e.preventDefault();

            // Inputs
            const name = document.getElementById("form-name").value.trim();
            const email = document.getElementById("form-email").value.trim();
            const subject = document.getElementById("form-subject").value.trim();
            const message = document.getElementById("form-message").value.trim();

            if (!name || !email || !subject || !message) {
                showFormStatus("Please fill in all inputs.", "error");
                return;
            }

            // Simple Email Regex Validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showFormStatus("Please enter a valid email address.", "error");
                return;
            }

            // Lock submit button
            formSubmitBtn.disabled = true;
            formSubmitBtn.textContent = "Sending Message...";
            formSubmitBtn.style.opacity = "0.7";

            // Mock network latency (1.5 seconds)
            setTimeout(() => {
                showFormStatus(`Thank you, ${name}! Your message has been received.`, "success");
                contactForm.reset();
                formSubmitBtn.disabled = false;
                formSubmitBtn.textContent = "Send Message";
                formSubmitBtn.style.opacity = "1";
            }, 1500);
        });
    }

    function showFormStatus(text, type) {
        statusMsg.textContent = text;
        statusMsg.className = "form-status"; // reset classes
        statusMsg.classList.add(type);

        // Fade in element
        statusMsg.style.display = "block";
        
        // Hide after 4 seconds
        setTimeout(() => {
            statusMsg.style.display = "none";
        }, 4000);
    }
});