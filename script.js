
// <!-- =========================================
        //  JAVASCRIPT
//  ========================================= -->

// =========================================
        // LOADING SCREEN
// =========================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 800);
});

// =========================================
        // SCROLL PROGRESS BAR
// =========================================
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// =========================================
        // THEME TOGGLE (DARK/LIGHT MODE)
// =========================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Cek preferensi yang tersimpan
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// =========================================
        // STICKY NAVBAR
// =========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =========================================
        // ACTIVE NAVBAR LINK ON SCROLL
// =========================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// =========================================
        // HAMBURGER MENU
// =========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
});

// Tutup menu saat klik link
navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
    });
});

// Tutup menu klik di luar
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
    }
});

// =========================================
        // TYPING TEXT ANIMATION
// =========================================
const typedTextSpan = document.getElementById('typedText');
const words = ['Frontend Developer', 'UI/UX Designer', 'Full-Stack Developer', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
    const currentWord = words[wordIndex];

if (isDeleting) {
    charIndex--;
    typingDelay = 50;
} else {
    charIndex++;
    typingDelay = 100;
}

typedTextSpan.textContent = currentWord.substring(0, charIndex);

if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typingDelay = 2000; // Jeda sebelum menghapus
} else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingDelay = 300; // Jeda sebelum mengetik kata baru
}

    setTimeout(typeEffect, typingDelay);
}

document.addEventListener('DOMContentLoaded', typeEffect);

// =========================================
        // COUNTER ANIMATION
// =========================================
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + '+';
                } else {
                    counter.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                }
            };

            updateCounter();
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// =========================================
        // SKILL PROGRESS BAR ANIMATION
// =========================================
const skillProgressBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            observer.unobserve(bar);
        }
    });
}, { threshold: 0.2 });

skillProgressBars.forEach(bar => skillObserver.observe(bar));

// =========================================
        // SCROLL REVEAL ANIMATION
// =========================================
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// =========================================
        // PORTFOLIO FILTER
// =========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// =========================================
        // CONTACT FORM VALIDATION
// =========================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(inputId + 'Error');
    input.classList.add('error');
    error.textContent = message;
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(inputId + 'Error');
    input.classList.remove('error');
    error.textContent = '';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const subject = document.getElementById('subject').value.trim();
const message = document.getElementById('message').value.trim();

clearError('name');
clearError('email');
clearError('subject');
clearError('message');

if (!name) {
    showError('name', 'Nama wajib diisi');
    isValid = false;
}

if (!email) {
    showError('email', 'Email wajib diisi');
    isValid = false;
} else if (!validateEmail(email)) {
    showError('email', 'Masukkan email yang valid');
    isValid = false;
}

if (!subject) {
    showError('subject', 'Subjek wajib diisi');
    isValid = false;
}

if (!message) {
    showError('message', 'Pesan wajib diisi');
    isValid = false;
} else if (message.length < 10) {
    showError('message', 'Pesan minimal 10 karakter');
    isValid = false;
}

if (isValid) {
    formStatus.className = 'form-status success';
        formStatus.textContent = 'Pesan Anda telah terkirim! Saya akan segera menghubungi Anda.';
        contactForm.reset();

setTimeout(() => {
    formStatus.className = 'form-status';
    formStatus.textContent = '';
}, 5000);
} else {
    formStatus.className = 'form-status error';
    formStatus.textContent = 'Mohon periksa kembali formulir Anda.';
    setTimeout(() => {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
    }, 3000);
}
});

// Hapus error saat input
['name', 'email', 'subject', 'message'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => clearError(id));
});

// =========================================
        // NEWSLETTER FORM
// =========================================
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    if (validateEmail(input.value.trim())) {
        alert('Terima kasih telah berlangganan!');
        input.value = '';
    } else {
        alert('Masukkan email yang valid');
    }
});

// =========================================
        // BACK TO TOP BUTTON
// =========================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =========================================
        // SMOOTH SCROLL FOR ANCHOR LINKS
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});