// --- Milestone Data ---
const milestones = [
    { date: "16 Mar 1978", text: "Air Faculty established, running the Senior Course only.", image: "images/img1.jpg" },
    { date: "26 Feb 1979", text: "Junior Division Staff Course established at NAF Base Kaduna.", image: "images/img2.jpg" },
    { date: "Aug 1986", text: "Air Faculty relocates from Kaduna to the Command and Staff College, Jaji.", image: "images/img3.jpg" },
    { date: "3 Jul 1986 – 4 Jul 1987", text: "Purpose-built DAW building founded and commissioned.", image: "images/img4.jpg" },
    { date: "9 Jun 2000", text: "Air Marshal Isaac Alfa Hall commissioned.", image: "images/img5.jpg" },
    { date: "2 Dec 2002", text: "Air Faculty redesignated Department of Air Warfare.", image: "images/img6.jpg" },
    { date: "27 May 2019", text: "SB Abubakar Centre commissioned.", image: "images/img7.jpg" },
    { date: "12 Feb 2024", text: "Air Operations Seminar replaces the annual Air Space Management Seminar.", image: "images/img8.jpg" },
    { date: "Feb 2024", text: "First bi-service Air-Land Exercise IMONGO DOO.", image: "images/img9.jpg" },
    { date: "Dec 2024", text: "Outdated DAW Handbook reviewed.", image: "images/img10.jpg" }
];

function updateMilestone(index) {
    const buttons = document.querySelectorAll('.timeline-btn');
    buttons.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const displayCard = document.getElementById('milestone-display');
    const dateEl = document.getElementById('ms-date');
    const textEl = document.getElementById('ms-text');
    const imageEl = document.getElementById('ms-image');

    displayCard.classList.remove('fade-in');
    
    setTimeout(() => {
        dateEl.textContent = milestones[index].date;
        textEl.textContent = milestones[index].text;
        imageEl.src = milestones[index].image;
        displayCard.classList.add('fade-in');
    }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
    updateMilestone(0);
});

// --- Upgraded Lightbox Functionality (Images & Videos) ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');

function openLightbox(src, type) {
    lightbox.style.display = 'flex';
    
    if (type === 'image') {
        lightboxImg.src = src;
        lightboxImg.style.display = 'block';
        
        // Hide and clear video to stop playing
        lightboxVideo.style.display = 'none';
        lightboxVideo.src = ''; 
    } 
    else if (type === 'video') {
        lightboxVideo.src = src;
        lightboxVideo.style.display = 'block';
        
        // Hide and clear image
        lightboxImg.style.display = 'none';
        lightboxImg.src = '';
    }
    
    // Prevent background scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    
    // Clear both sources to ensure media stops
    lightboxImg.src = '';
    lightboxVideo.src = '';
    
    // Re-enable background scrolling
    document.body.style.overflow = 'auto';
}

// Close lightbox if user clicks outside the media content
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Allow closing with the 'Escape' key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
    }
});

// --- Scroll Animation Observer ---
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-card, .gallery-item').forEach(el => {
    if(el.id !== 'milestone-display') {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    }
});