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
        
        // Show/hide clear button
        if (searchTerm.length > 0) {
            clearBtn.style.display = 'flex';
        } else {
            clearBtn.style.display = 'none';
        }
        
        // Filter projects
        projectCards.forEach(card => {
            const projectName = card.getAttribute('data-name') || '';
            const title = card.querySelector('h3')?.innerText.toLowerCase() || '';
            const desc = card.querySelector('p')?.innerText.toLowerCase() || '';
            
            if (title.includes(searchTerm) || desc.includes(searchTerm) || projectName.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show message if no results
        const visibleCards = document.querySelectorAll('.project-card[style*="display: block"], .project-card:not([style*="display: none"])');
        let noResultMsg = document.querySelector('.no-result');
        
        if (visibleCards.length === 0 && projectCards.length > 0) {
            if (!noResultMsg) {
                noResultMsg = document.createElement('div');
                noResultMsg.className = 'no-result';
                noResultMsg.innerHTML = `
                    <i class="fas fa-search"></i>
                    <p>Tidak ada project yang ditemukan untuk "${searchTerm}"</p>
                `;
                document.querySelector('.projects-grid').after(noResultMsg);
            }
        } else {
            if (noResultMsg) noResultMsg.remove();
        }
    });
    
    // Clear search
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            projectCards.forEach(card => {
                card.style.display = 'block';
            });
            const noResultMsg = document.querySelector('.no-result');
            if (noResultMsg) noResultMsg.remove();
            searchInput.focus();
        });
    }
}

// ========================================
// MODAL POPUP FOR PROJECTS
// ========================================
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.modal-close');

// Project Data
const projectDetails = {
    perpustakaan: {
        title: 'Perpustakaan Digital',
        description: `
            <div class="project-detail">
                <div class="detail-icon"><i class="fas fa-book-open"></i></div>
                <h3>Aplikasi Perpustakaan Digital</h3>
                <p>Sebuah aplikasi web untuk manajemen perpustakaan sekolah secara digital. Memudahkan siswa dan guru dalam mencari, meminjam, dan mengembalikan buku.</p>
                
                <h4>Fitur Utama:</h4>
                <ul>
                    <li><i class="fas fa-check-circle"></i> Katalog buku digital</li>
                    <li><i class="fas fa-check-circle"></i> Sistem peminjaman online</li>
                    <li><i class="fas fa-check-circle"></i> Manajemen anggota perpustakaan</li>
                    <li><i class="fas fa-check-circle"></i> Laporan peminjaman</li>
                    <li><i class="fas fa-check-circle"></i> Notifikasi pengembalian</li>
                </ul>
                
                <h4>Teknologi yang Digunakan:</h4>
                <div class="detail-tech">
                    <span>HTML5</span>
                    <span>CSS3</span>
                    <span>JavaScript</span>
                    <span>PHP</span>
                    <span>MySQL</span>
                    <span>Bootstrap</span>
                </div>
                
                <div class="detail-links">
                    <a href="#" class="btn-demo"><i class="fab fa-github"></i> Lihat Source Code</a>
                </div>
            </div>
        `
    },
    toko: {
        title: 'Toko Online',
        description: `
            <div class="project-detail">
                <div class="detail-icon"><i class="fas fa-shopping-cart"></i></div>
                <h3>Website E-Commerce Modern</h3>
                <p>Platform belanja online dengan fitur lengkap untuk pengalaman berbelanja yang mudah dan aman.</p>
                
                <h4>Fitur Utama:</h4>
                <ul>
                    <li><i class="fas fa-check-circle"></i> Katalog produk lengkap</li>
                    <li><i class="fas fa-check-circle"></i> Keranjang belanja</li>
                    <li><i class="fas fa-check-circle"></i> Sistem pembayaran online</li>
                    <li><i class="fas fa-check-circle"></i> Manajemen stok produk</li>
                    <li><i class="fas fa-check-circle"></i> Dashboard admin</li>
                    <li><i class="fas fa-check-circle"></i> Sistem rating dan review</li>
                </ul>
                
                <h4>Teknologi yang Digunakan:</h4>
                <div class="detail-tech">
                    <span>React.js</span>
                    <span>Node.js</span>
                    <span>Express</span>
                    <span>MongoDB</span>
                    <span>Tailwind CSS</span>
                </div>
                
                <div class="detail-links">
                    <a href="#" class="btn-demo"><i class="fab fa-github"></i> Lihat Source Code</a>
                </div>
            </div>
        `
    },
    smk: {
        title: 'Profil SMK Pramaartha',
        description: `
            <div class="project-detail">
                <div class="detail-icon"><i class="fas fa-school"></i></div>
                <h3>Website Profil SMK Swasta Pramaartha</h3>
                <p>Website profil sekolah modern yang menampilkan informasi lengkap tentang SMK Swasta Pramaartha.</p>
                
                <h4>Fitur Utama:</h4>
                <ul>
                    <li><i class="fas fa-check-circle"></i> Profil sekolah dan visi misi</li>
                    <li><i class="fas fa-check-circle"></i> Informasi jurusan PPLG</li>
                    <li><i class="fas fa-check-circle"></i> Galeri kegiatan sekolah</li>
                    <li><i class="fas fa-check-circle"></i> Prestasi siswa</li>
                    <li><i class="fas fa-check-circle"></i> Form pendaftaran online</li>
                    <li><i class="fas fa-check-circle"></i> Responsive design</li>
                </ul>
                
                <h4>Teknologi yang Digunakan:</h4>
                <div class="detail-tech">
                    <span>HTML5</span>
                    <span>CSS3</span>
                    <span>JavaScript</span>
                    <span>Tailwind CSS</span>
                    <span>AOS Animation</span>
                </div>
                
                <div class="detail-links">
                    <a href="#" class="btn-demo"><i class="fab fa-github"></i> Lihat Source Code</a>
                </div>
            </div>
        `
    }
};

// Open Modal Function
function openProjectModal(projectId) {
    const project = projectDetails[projectId];
    if (project) {
        modalTitle.innerHTML = project.title;
        modalBody.innerHTML = project.description;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add animation
        modal.style.animation = 'fadeIn 0.3s ease';
    }
}

// Close Modal
if (closeBtn) {
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Counter Animation
const counters = document.querySelectorAll('.stat-number');
const counterObserver2 = new IntersectionObserver((entries) => {
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
            counterObserver2.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver2.observe(counter));

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
