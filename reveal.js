// Reveal text on scroll, repeat for each section when entering viewport
function isSectionInViewport(section) {
  const rect = section.getBoundingClientRect();
  return (
    rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.2
  );
}

let lastActiveSection = null;

function revealSectionTexts(section) {
  const reveals = section.querySelectorAll('.reveal-text');
  reveals.forEach(el => {
    el.classList.remove('visible');
  });
  let delay = 0;
  reveals.forEach((el, idx) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, delay);
    delay += 200;
  });
}

function handleSectionReveal() {
  const sections = document.querySelectorAll('.reveal-section');
  let found = false;
  sections.forEach(section => {
    if (!found && isSectionInViewport(section)) {
      if (lastActiveSection !== section) {
        revealSectionTexts(section);
        lastActiveSection = section;
      }
      found = true;
    }
  });
  if (!found) lastActiveSection = null;
}

document.addEventListener('DOMContentLoaded', handleSectionReveal);
window.addEventListener('scroll', handleSectionReveal);
window.addEventListener('resize', handleSectionReveal); 