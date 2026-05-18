// ========================================
// PREMIUM PORTFOLIO - RED & BLACK THEME
// ========================================

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Custom Cursor (Desktop only)
if (window.innerWidth > 768) {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
            
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            cursorOutline.style.transform = `translate3d(${outlineX - 17}px, ${outlineY - 17}px, 0)`;
        });
        
        const hoverElements = document.querySelectorAll('a, button, .project-card, .btn-primary, .btn-outline, .tool-item, .contact-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.borderColor = '#dc2626';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '35px';
                cursorOutline.style.height = '35px';
                cursorOutline.style.borderColor = '#dc2626';
            });
        });
    }
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Typing Animation
const typingElement = document.querySelector('.typing-text');
if (typingElement && typeof Typed !== 'undefined') {
    new Typed('.typing-text', {
        strings: ['Web Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Creative Thinker'],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        cursorChar: '▊'
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = navbar?.offsetHeight || 70;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href')?.replace('#', '');
        if (href === current) {
            link.classList.add('active');
        }
    });
});

// Progress Bar Animation
const progressBars = document.querySelectorAll('.progress');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            if (width) {
                const parent = bar.closest('.skill-item');
                const percentSpan = parent?.querySelector('.skill-info span:last-child');
                
                if (percentSpan) {
                    let count = 0;
                    const targetPercent = parseInt(width);
                    const interval = setInterval(() => {
                        if (count >= targetPercent) {
                            clearInterval(interval);
                        } else {
                            count++;
                            percentSpan.textContent = count + '%';
                        }
                    }, 20);
                }
                
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            }
            observer.unobserve(bar);
        }
    });
}, observerOptions);

progressBars.forEach(bar => observer.observe(bar));

// ========================================
// SEARCH FUNCTIONALITY
// ========================================
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('searchClear');
const projectCards = document.querySelectorAll('.project-card');

if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm.length > 0) {
            if (clearBtn) clearBtn.style.display = 'flex';
        } else {
            if (clearBtn) clearBtn.style.display = 'none';
        }
        
        let visibleCount = 0;
        projectCards.forEach(card => {
            const title = card.querySelector('h3')?.innerText.toLowerCase() || '';
            const desc = card.querySelector('p')?.innerText.toLowerCase() || '';
            
            if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        let noResultMsg = document.querySelector('.no-result');
        if (visibleCount === 0 && projectCards.length > 0) {
            if (!noResultMsg) {
                noResultMsg = document.createElement('div');
                noResultMsg.className = 'no-result';
                noResultMsg.innerHTML = `
                    <i class="fas fa-search"></i>
                    <p>Tidak ada project yang ditemukan</p>
                `;
                document.querySelector('.projects-grid').after(noResultMsg);
            }
        } else {
            if (noResultMsg) noResultMsg.remove();
        }
    });
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (clearBtn) clearBtn.style.display = 'none';
            projectCards.forEach(card => {
                card.style.display = 'block';
            });
            const noResultMsg = document.querySelector('.no-result');
            if (noResultMsg) noResultMsg.remove();
            if (searchInput) searchInput.focus();
        });
    }
}

// Counter Animation
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.innerText);
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);
            
            const updateCounter = () => {
                count += increment;
                if (count < target) {
                    counter.innerText = Math.floor(count) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + '+';
                }
            };
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// AOS Initialization
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: false,
        offset: 100,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        mirror: true
    });
}

// Dynamic Footer Year
const footerYear = document.querySelector('.footer-bottom p:first-child');
if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.innerHTML = `&copy; ${year} Ade Wardhana - 11 PPLG 1 | SMK Swasta Pramaartha. All Rights Reserved.`;
}

// Cek device mobile untuk cursor
if (window.innerWidth <= 768) {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorOutline) cursorOutline.style.display = 'none';
}
