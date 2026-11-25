/*
=========================================================
  DevLibrary V3 - JavaScript interactions
  No fetch() and no local web server required.
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {
    // Mobile navigation menu
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("is-open");

            menuButton.setAttribute("aria-expanded", String(isOpen));
        });

        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navigation.classList.remove("is-open");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Reveal elements when they enter the viewport
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }

    // Copy code snippets to the clipboard
    const copyButtons = document.querySelectorAll(".code-copy");

    copyButtons.forEach((button) => {
        button.addEventListener("click", async () => {
            const codeElement = button
                .closest(".code-block")
                ?.querySelector("pre code");

            if (!codeElement) {
                return;
            }

            try {
                await navigator.clipboard.writeText(codeElement.innerText);

                button.textContent = "Copied!";

                window.setTimeout(() => {
                    button.textContent = "Copy code";
                }, 1400);
            } catch (error) {
                console.error("Could not copy code:", error);
                button.textContent = "Copy unavailable";
            }
        });
    });
});