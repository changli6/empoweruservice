// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => nav.classList.toggle('active'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('active')));

// Accessibility toolbar
const savedSize = localStorage.getItem('a11y-large');
const savedContrast = localStorage.getItem('a11y-contrast');
if (savedSize === '1') document.body.classList.add('a11y-large');
if (savedContrast === '1') document.body.classList.add('a11y-high-contrast');

document.getElementById('a11y-increase').addEventListener('click', () => {
    document.body.classList.add('a11y-large');
    localStorage.setItem('a11y-large', '1');
});
document.getElementById('a11y-decrease').addEventListener('click', () => {
    document.body.classList.remove('a11y-large');
    localStorage.setItem('a11y-large', '0');
});
document.getElementById('a11y-contrast').addEventListener('click', () => {
    document.body.classList.toggle('a11y-high-contrast');
    localStorage.setItem('a11y-contrast', document.body.classList.contains('a11y-high-contrast') ? '1' : '0');
});
document.getElementById('a11y-reset').addEventListener('click', () => {
    document.body.classList.remove('a11y-large', 'a11y-high-contrast');
    localStorage.removeItem('a11y-large');
    localStorage.removeItem('a11y-contrast');
});

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Contact form: success message (Formspree handles actual submission)
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', () => {
        setTimeout(() => alert('Thanks! Your message has been sent. We will get back to you soon.'), 500);
    });
}
