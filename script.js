
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
};


const updateThemeIcon = (theme) => {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'light') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
};

// Toggle theme
const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
};

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Scroll Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-item, .profile-card, .education-item, .project-card');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.style.opacity = '1';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
        navbar.style.background = currentTheme === 'dark' 
            ? 'rgba(0, 0, 0, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = currentTheme === 'dark' 
            ? 'rgba(0, 0, 0, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
    }
});

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    // Add event listener to theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleTheme);
});

function openResumeModal() {
    document.getElementById("resumeModal").style.display = "block";
}

function closeResumeModal() {
    document.getElementById("resumeModal").style.display = "none";
}

// Close modal when clicking outside content
window.addEventListener("click", (e) => {
    const modal = document.getElementById("resumeModal");
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

function trackResumeDownload() {
    let count = localStorage.getItem("resumeDownloads") || 0;
    count++;
    localStorage.setItem("resumeDownloads", count);
    console.log("Resume downloaded:", count);
}

