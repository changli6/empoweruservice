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

var a11yInc = document.getElementById('a11y-increase');
if (a11yInc) {
    a11yInc.addEventListener('click', function () {
        document.body.classList.add('a11y-large');
        localStorage.setItem('a11y-large', '1');
    });
}

var a11yDec = document.getElementById('a11y-decrease');
if (a11yDec) {
    a11yDec.addEventListener('click', function () {
        document.body.classList.remove('a11y-large');
        localStorage.setItem('a11y-large', '0');
    });
}
var a11yReset = document.getElementById('a11y-contrast');
if (a11yReset) {
    a11yReset.addEventListener('click', function () {
        document.body.classList.remove('a11y-large');
        localStorage.removeItem('a11y-large');
    });
}
var a11yReset = document.getElementById('a11y-reset');
if (a11yReset) {
    a11yReset.addEventListener('click', function () {
        document.body.classList.remove('a11y-large');
        localStorage.removeItem('a11y-large');
    });
}


// ── Back to Top ──
var backToTop = document.getElementById('back-to-top');
if (backToTop) {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) backToTop.classList.add('show');
        else backToTop.classList.remove('show');
    });
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

document.addEventListener('DOMContentLoaded', function () {

    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();


        // 先把文字存到变量里，不碰 select
        var subjectSel = contactForm.querySelector('#subject');
        var subjectText = 'General Enquiry';
        if (subjectSel) {
            subjectText = subjectSel.selectedOptions[0].text;
        }

        // _subject 隐藏字段
        var hidden = contactForm.querySelector('#email-subject');
        if (hidden) {
            hidden.value = 'EmpowerUService Enquiry — ' + subjectText;
        }
        // 用 FormData 收集，确认一下
        var formData = new FormData(contactForm);

         // 强制写入 subject，用变量里的文字
        formData.set('subject', 'Empower U Service Enquiry —' + subjectText);


        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                contactForm.innerHTML = '<div class="form-success" style="text-align:center;padding:3rem 2rem;background:#f0fdf4;border-radius:12px;border:1px solid #00843D;"><h3 style="color:#00843D;margin-bottom:0.75rem;font-size:1.3rem;">✓ Message Sent!</h3><p style="color:#555;">Thank you for contacting us. We\'ll get back to you within 24 hours on business days.</p></div>';
            } else {
                throw new Error('Failed');
            }
        } catch (err) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            alert('Something went wrong. Please try again or email us directly at accounts@empoweruservice.com');
        }
    });

});