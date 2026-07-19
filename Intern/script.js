/*=========================================
        PORTFOLIO SCRIPT
        Linden Powell Rivera
=========================================*/

/*==============================
        HTML INCLUDES
==============================*/

async function includeHTML(id, file) {

    const element = document.getElementById(id);

    if (!element) return;

    try {

        const response = await fetch(file);

        if (!response.ok)
            throw new Error(`Cannot load ${file}`);

        element.innerHTML = await response.text();

    } catch (err) {

        console.error(err);

    }

}

/*==============================
        LOAD EVERYTHING
==============================*/

async function loadPortfolio() {

    await includeHTML("nav-include", "nav.html");
    await includeHTML("hero-include", "hero.html");
    await includeHTML("about-include", "about.html");
    await includeHTML("experience-include", "experience.html");
    await includeHTML("resume-include", "resume.html");
    await includeHTML("works-include", "work.html");
    await includeHTML("contact-include", "contact.html");

    initializePortfolio();

}

document.addEventListener("DOMContentLoaded", loadPortfolio);

/*=====================================================
                INITIALIZE
=====================================================*/

function initializePortfolio() {

    mobileNavigation();

    navbarAnimation();

    activeNavigation();

    revealAnimation();

    experienceTabs();

    worksTabs();

    smoothScrolling();

    playAboutVideo();

    floatingHero();

}

/*=====================================================
                NAVBAR
=====================================================*/

function navbarAnimation() {

    const navbar = document.getElementById("floatingNav");

    const hero = document.querySelector(".hero");

    if (!navbar || !hero) return;

    function updateNavbar() {

        const trigger = hero.offsetHeight - 120;

        if (window.scrollY > trigger) {

            navbar.classList.add("show");

        } else {

            navbar.classList.remove("show");

        }

    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar);

}

/*=====================================================
                ACTIVE LINKS
=====================================================*/

function activeNavigation() {

    const sections = document.querySelectorAll("section");

    const links = document.querySelectorAll(".nav-link");

    if (!sections.length) return;

    function updateLinks() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 180;

            const height = section.offsetHeight;

            if (window.scrollY >= top &&
                window.scrollY < top + height) {

                current = section.id;

            }

        });

        links.forEach(link => {

            link.classList.remove("active");

            if (link.dataset.target === current) {

                link.classList.add("active");

            }

        });

    }

    updateLinks();

    window.addEventListener("scroll", updateLinks);

}

/*=====================================================
                REVEAL
=====================================================*/

function revealAnimation() {

    const elements = document.querySelectorAll("[data-animate]");

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: .15

    });

    elements.forEach(el => observer.observe(el));

}

/*=====================================================
                EXPERIENCE
=====================================================*/

function experienceTabs() {

    const tabs = document.querySelectorAll(".exp-tab");

    const panels = document.querySelectorAll(".exp-panel");

    if (!tabs.length) return;

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            tabs.forEach(t => t.classList.remove("active"));

            tab.classList.add("active");

            const target = tab.dataset.tab;

            panels.forEach(panel => {

                panel.classList.remove("active");

                if (panel.dataset.panel === target) {

                    panel.classList.add("active");

                }

            });

        });

    });

}

/*=====================================================
                WORKS TABS
=====================================================*/

function worksTabs() {

    const tabs = document.querySelectorAll(".works-tab");

    const schoolWorks = document.querySelector(".school-works");

    const personalWorks = document.querySelector(".personal-works");

    if (!tabs.length) return;

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const category = tab.dataset.category;


            tabs.forEach(button => {

                button.classList.remove("active");

            });

            tab.classList.add("active");


            if (category === "school") {

                schoolWorks.style.display = "grid";

                personalWorks.style.display = "none";

            }


            if (category === "personal") {

                schoolWorks.style.display = "none";

                personalWorks.style.display = "grid";

            }

        });

    });

}

/*=====================================================
            SMOOTH SCROLL
=====================================================*/

function smoothScrolling() {

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

}

/*=====================================================
            ABOUT VIDEO
=====================================================*/

function playAboutVideo() {

    const video = document.getElementById("aboutVideo");

    if (!video) return;

    video.play().catch(() => { });

}

/*=====================================================
            FLOATING HERO IMAGE
=====================================================*/

function floatingHero() {

    const card = document.querySelector(".profile-hero");

    if (!card) return;

    let direction = 1;

    let position = 0;

    function animate() {

        position += direction * 0.02;

        if (position >= 8) direction = -1;

        if (position <= 0) direction = 1;

        card.style.transform = `translateY(${-position}px)`;

        requestAnimationFrame(animate);

    }

    animate();

}

function mobileNavigation(){

    const button=document.getElementById("navToggler");

    const menu=document.getElementById("mobileMenu");

    if(!button||!menu) return;

    button.addEventListener("click",()=>{

        menu.classList.toggle("active");

    });

}
const aboutVideo = document.getElementById("aboutVideo");
const aboutIntro = document.getElementById("aboutIntro");
const aboutContent = document.getElementById("aboutContent");

if (aboutVideo && aboutContent && aboutIntro) {

    aboutVideo.addEventListener("ended", () => {

        aboutIntro.style.display = "none";

        aboutContent.style.display = "block";

        requestAnimationFrame(() => {
            aboutContent.classList.add("show");
        });

    });

}

