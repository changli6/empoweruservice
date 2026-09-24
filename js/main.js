// ── Mobile Navigation ──
var hamburger = document.getElementById('hamburger');
var nav = document.getElementById('nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    var navLinks = nav.querySelectorAll('a');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function() {
            nav.classList.remove('active');
        });
    }
}

// ── Language Switcher ──
var langToggle = document.getElementById('langToggle');
var langDropdown = document.getElementById('langDropdown');

if (langToggle && langDropdown) {
    langToggle.addEventListener('click', function(e) {
        e.preventDefault();
        langDropdown.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.lang-switcher')) {
            langDropdown.classList.remove('active');
        }
    });
}

// ── Accessibility ──
var a11yToggle = document.getElementById('a11yToggle');
var a11yOptions = document.getElementById('a11yOptions');

if (a11yToggle && a11yOptions) {
    a11yToggle.addEventListener('click', function() {
        a11yOptions.classList.toggle('active');
    });
}

var a11yIncrease = document.getElementById('a11yIncrease');
if (a11yIncrease) {
    a11yIncrease.addEventListener('click', function() {
        document.body.classList.add('a11y-large');
        localStorage.setItem('a11y-large', '1');
    });
}

var a11yDecrease = document.getElementById('a11yDecrease');
if (a11yDecrease) {
    a11yDecrease.addEventListener('click', function() {
        document.body.classList.remove('a11y-large');
        localStorage.setItem('a11y-large', '0');
    });
}

var a11yContrast = document.getElementById('a11yContrast');
if (a11yContrast) {
    a11yContrast.addEventListener('click', function() {
        document.body.classList.toggle('a11y-contrast');
        localStorage.setItem('a11y-contrast', document.body.classList.contains('a11y-contrast') ? '1' : '0');
    });
}

var a11yReset = document.getElementById('a11yReset');
if (a11yReset) {
    a11yReset.addEventListener('click', function() {
        document.body.classList.remove('a11y-large', 'a11y-contrast');
        localStorage.removeItem('a11y-large');
        localStorage.removeItem('a11y-contrast');
    });
}

if (localStorage.getItem('a11y-large') === '1') {
    document.body.classList.add('a11y-large');
}
if (localStorage.getItem('a11y-contrast') === '1') {
    document.body.classList.add('a11y-contrast');
}

// ── Back to Top ──
var backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── Contact Form (Formspree) ──
document.addEventListener('DOMContentLoaded', function() {
    var contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var subjectSel = contactForm.querySelector('#subject');
        var subjectText = 'General Enquiry';
        if (subjectSel && subjectSel.selectedOptions.length > 0) {
            subjectText = subjectSel.selectedOptions[0].text;
        }

        var hidden = contactForm.querySelector('#email-subject');
        if (hidden) {
            hidden.value = 'Empower U Service Enquiry — ' + subjectText;
        }

        var formData = new FormData(contactForm);
        formData.set('subject', 'Empower U Service Enquiry — ' + subjectText);

        var submitBtn = contactForm.querySelector('button[type="submit"]');
        var originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(function(response) {
            if (response.ok) {
                var lang = (document.documentElement.lang || 'en').substring(0, 2);
                var successHtml = '';
                if (lang === 'zh') {
                    successHtml = '<div class="form-success"><h3>✓ 消息已发送！</h3><p>感谢您的联系，我们将在 24 小时内回复您。</p></div>';
                } else if (lang === 'ko') {
                    successHtml = '<div class="form-success"><h3>✓ 메시지가 전송되었습니다!</h3><p>문의해 주셔서 감사합니다. 24시간 이내에 연락드리겠습니다.</p></div>';
                } else {
                    successHtml = '<div class="form-success"><h3>✓ Message Sent!</h3><p>Thank you for contacting us. We\'ll get back to you within 24 hours.</p></div>';
                }
                contactForm.innerHTML = successHtml;
            } else {
                throw new Error('Failed');
            }
        })
        .catch(function() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            alert('Something went wrong. Please try again or email us directly at hello@empoweruservice.com');
        });
    });
});
