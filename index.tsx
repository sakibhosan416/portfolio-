
/**
 * PURE VANILLA JAVASCRIPT
 * Handles section transitions and the global lightbox.
 */

// Navigation Logic
const sections = document.querySelectorAll('.section');
const navButtons = document.querySelectorAll('[data-target]');

function navigateTo(targetId: string) {
    // Fade out current
    sections.forEach(s => {
        // Casting s to HTMLElement because querySelectorAll returns Element which lacks 'style'
        const element = s as HTMLElement;
        element.classList.remove('active');
        element.style.display = 'none'; // Ensure it's removed from layout for cleaner transitions
    });

    const target = document.getElementById(targetId);
    if (target) {
        target.style.display = 'block';
        // Minor timeout to allow display:block to register before opacity transition
        setTimeout(() => {
            target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 10);
    }
}

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        if (target) navigateTo(target);
    });
});

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc = document.getElementById('lightbox-desc');
const closeBtn = document.getElementById('close-lightbox');

(window as any).openLightbox = function(url: string, title: string, desc: string) {
    if (!lightbox || !lightboxImg || !lightboxTitle || !lightboxDesc) return;

    lightboxImg.src = url;
    lightboxTitle.innerText = title;
    lightboxDesc.innerText = desc;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
};

closeBtn?.addEventListener('click', () => {
    lightbox?.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close on background click
lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ESC key to close
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        lightbox?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
