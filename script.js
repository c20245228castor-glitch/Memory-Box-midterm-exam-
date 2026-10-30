// =====================================================
// MIDTERM STARTER: script.js
// Each section below matches an item on your checklist.
// Delete these hint comments as you finish each part, and
// remove any console.log you used for testing before you submit.
// =====================================================

gsap.registerPlugin(ScrollTrigger);

// ---- B1: DARK MODE TOGGLE ----
const darkModeToggle = document.querySelector("#darkModeToggle");

const updateDarkModeButton = (isDarkMode) => {
    if (!darkModeToggle) return;

    darkModeToggle.setAttribute("aria-pressed", String(isDarkMode));
    darkModeToggle.setAttribute("aria-label", isDarkMode ? "Switch to light mode" : "Switch to dark mode");
    darkModeToggle.innerHTML = isDarkMode
        ? '<span aria-hidden="true">☀️</span> Light mode'
        : '<span aria-hidden="true">🌙</span> Dark mode';
};

if (darkModeToggle) {
    updateDarkModeButton(document.documentElement.classList.contains("dark"));

    darkModeToggle.addEventListener("click", () => {
        const isDarkMode = document.documentElement.classList.toggle("dark");
        localStorage.setItem("memoryBoxTheme", isDarkMode ? "dark" : "light");
        updateDarkModeButton(isDarkMode);
    });
}


// ---- D1 + D2: PAGE-LOAD INTRO TIMELINE ----
// TODO: build ONE gsap.timeline() with a defaults object, 3+ steps,
//       at least one stagger, and at least one position-parameter overlap.
//       Keep the total under about 3 seconds.
//       Add a one-line comment explaining why you chose each ease.


// ---- D3: CLICK INTERACTION ----
// TODO: wire #replayBtn to your timeline (or add another GSAP click effect)


// ---- E1-E3: SCROLL TRIGGERS AND SCRUB ----


const intro = gsap.timeline({
    defaults: {
        duration: 0.8
    }
});

// Fade in the navigation smoothly.
intro.from("nav", {
    y: -30,
    opacity: 0,
    ease: "power2.out"
});

// Make the home heading appear smoothly.
intro.from("#home h2", {
    y: 30,
    opacity: 0,
    ease: "back.out(1.2)" // Adds a small bounce effect.
}, "-=0.4");

// Show the home paragraph.
intro.from("#home p", {
    opacity: 0,
    y: 20,
    ease: "power1.out" // Creates a simple, smooth fade.
}, "-=0.4");


gsap.registerPlugin(ScrollTrigger);

const reveals = gsap.utils.toArray("main section.reveal");
reveals.forEach((section) => {
    gsap.from(section, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

const progressBar = document.querySelector("#progressBar");
if (progressBar) {
    gsap.set(progressBar, { scaleX: 0, transformOrigin: "left center" });

    gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "+=300",
            scrub: true,
            invalidateOnRefresh: true
        }
    });

    ScrollTrigger.create({

        trigger: "#services",
        start: "top top",
        endtrigger: "#contact",
        end: "+=300",
        pin: true,
        scrub: true,
        invalidateOnRefresh: true


    });



}
const replayButton = document.querySelector("#replay");

if (replayButton) {

    replayButton.addEventListener("click", () => {
        intro.restart();
    });
}

window.addEventListener("load", () => ScrollTrigger.refresh(true));
