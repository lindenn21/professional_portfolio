document.addEventListener('DOMContentLoaded', () => {

  const sections = [
    { id: "nav-include",        file: "partials/nav.html" },
    { id: "hero-include",       file: "partials/hero.html" },
    { id: "about-include",      file: "partials/about.html" },
    { id: "works-include",      file: "partials/work.html" },
    { id: "experience-include", file: "partials/experience.html" },
    { id: "resume-include",     file: "partials/resume.html" },
    { id: "contact-include",    file: "partials/contact.html" },
  ];

  let navLoaded = false;
  let heroLoaded = false;

  function setupFloatingNav() {
    if (!navLoaded || !heroLoaded) return;

    const nav = document.getElementById('floatingNav');
    const home = document.getElementById('home');

    if (!nav || !home) {
      console.error('Nav or home section not found', nav, home);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        nav.classList.toggle('visible', !entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(home);

    const toggler = document.getElementById('navToggler');
    const mobileMenu = document.getElementById('mobileMenu');
    if (toggler && mobileMenu) {
      toggler.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
      });
    }
  }

  function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
      console.error('custom-cursor element not found');
      return;
    }

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    const hoverTargets = document.querySelectorAll('a, button, .btn-primary, .btn-ghost, .contact-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
  }

  // custom cursor only depends on elements already in index.html (not partials), so init it now
  initCustomCursor();

  sections.forEach(section => {
    fetch(section.file)
      .then(res => res.text())
      .then(html => {
        document.getElementById(section.id).outerHTML = html;

        if (section.id === "nav-include") {
          navLoaded = true;
          setupFloatingNav();
        }

        if (section.id === "hero-include") {
          heroLoaded = true;
          $('#heroCarousel').carousel({ interval: 5000, ride: 'carousel' });
          setupFloatingNav();
        }

        if (section.id === "about-include") {
          const aboutSection = document.getElementById('about');
          const aboutVideo = document.getElementById('aboutVideo');
          const aboutTitle = document.querySelector('.about-title');
          const aboutContent = document.querySelector('.about-content');

          const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                aboutVideo.classList.remove('faded');
                aboutTitle.classList.remove('visible');
                aboutContent.classList.remove('visible');
                aboutVideo.currentTime = 0;
                aboutVideo.play();

                setTimeout(() => {
                  aboutVideo.classList.add('faded');
                }, 3000);

                setTimeout(() => {
                  aboutTitle.classList.add('visible');
                  aboutContent.classList.add('visible');
                }, 3000);

              } else {
                aboutVideo.pause();
                aboutVideo.classList.remove('faded');
                aboutTitle.classList.remove('visible');
                aboutContent.classList.remove('visible');
              }
            });
          }, { threshold: 0.1 });

          aboutObserver.observe(aboutSection);
        }
      })
      .catch(err => console.error(`Could not load ${section.file}:`, err));
  });

});


const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

const hoverTargets = document.querySelectorAll('a, button, .btn-primary, .btn-ghost, .contact-card');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

