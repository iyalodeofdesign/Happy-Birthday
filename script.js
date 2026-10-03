/**
 * Temi's Birthday Guestbook - Interactive Application Script
 * Features Pre-Landing Intro Screen (TemiIntroScreen) with Newspaper Collage & Modal
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Storage Keys & Initial Data
    // ==========================================
    const STORAGE_KEY_WISHES = 'temi_birthday_wishes_v2';
    const STORAGE_KEY_THEME = 'temi_theme_v1';
    const STORAGE_KEY_INTRO = 'temi_has_seen_intro';

    let wishes = [];
    let currentSlideIndex = 0;
    let isGridView = false;

    // Touch Swiping State
    let startX = 0;
    let isDragging = false;

    // ==========================================
    // Initialization
    // ==========================================
    function init() {
        initIntroScreen();
        loadWishes();
        loadTheme();
        setupEventListeners();
        renderWishes();
        updateWishesCounter();

        // Character counter for wish textarea
        const textarea = document.getElementById('sender-message');
        const charCount = document.getElementById('char-count');
        if (textarea && charCount) {
            textarea.addEventListener('input', () => {
                charCount.textContent = textarea.value.length;
            });
        }
    }

    // ==========================================
    // Pre-Landing Intro Screen (TemiIntroScreen)
    // ==========================================
    function initIntroScreen() {
        const introScreen = document.getElementById('temi-intro-screen');
        if (!introScreen) return;

        // Strict Click-Gated Gateway: Always show intro screen on landing
        introScreen.classList.remove('fade-out');

        // 'Write Wish' button click handler on Intro Popup Modal
        // THIS IS THE ONLY TRIGGER THAT SETS showIntro TO FALSE AND PROCEEDS
        const writeWishIntroBtn = document.getElementById('write-wish-intro-btn');
        if (writeWishIntroBtn) {
            writeWishIntroBtn.addEventListener('click', () => {
                dismissIntroScreen();
            });
        }

        // Replay Intro Button in Navbar
        const replayBtn = document.getElementById('replay-intro-btn');
        if (replayBtn) {
            replayBtn.addEventListener('click', () => {
                showIntroScreen();
            });
        }
    }

    function dismissIntroScreen() {
        const introScreen = document.getElementById('temi-intro-screen');
        if (introScreen) {
            introScreen.classList.add('fade-out');
        }
        localStorage.setItem(STORAGE_KEY_INTRO, 'true');

        // Smooth scroll to wish form
        setTimeout(() => {
            const wishFormSection = document.getElementById('write-wish');
            if (wishFormSection) {
                wishFormSection.scrollIntoView({ behavior: 'smooth' });
                const nameInput = document.getElementById('sender-name');
                if (nameInput) nameInput.focus();
            }
            triggerConfetti();
        }, 300);
    }

    function showIntroScreen() {
        const introScreen = document.getElementById('temi-intro-screen');
        if (introScreen) {
            introScreen.classList.remove('fade-out');
        }
    }

    // ==========================================
    // Data Storage & Theme
    // ==========================================
    function loadWishes() {
        const stored = localStorage.getItem(STORAGE_KEY_WISHES);
        if (stored) {
            try {
                wishes = JSON.parse(stored);
            } catch (e) {
                wishes = [];
            }
        } else {
            wishes = [];
            saveWishes();
        }
    }

    function saveWishes() {
        localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(wishes));
        updateWishesCounter();
    }

    function loadTheme() {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // ==========================================
    // Render Wishes & Carousel Logic
    // ==========================================
    function updateWishesCounter() {
        const count = wishes.length;
        const countPill = document.getElementById('counter-count');
        if (countPill) countPill.textContent = count;
    }

    function renderWishes() {
        const track = document.getElementById('carousel-track');
        const dotsContainer = document.getElementById('carousel-dots');
        const galleryGrid = document.getElementById('user-gallery-grid');

        if (track) {
            track.innerHTML = '';
            if (dotsContainer) dotsContainer.innerHTML = '';

            wishes.forEach((wish, index) => {
                const card = createWishCard(wish);
                track.appendChild(card);

                if (dotsContainer && !isGridView) {
                    const dot = document.createElement('div');
                    dot.className = `dot ${index === currentSlideIndex ? 'active' : ''}`;
                    dot.addEventListener('click', () => goToSlide(index));
                    dotsContainer.appendChild(dot);
                }
            });

            updateCarouselPosition();
        }

        // Render Dynamic Gallery Grid of User-Uploaded Photos
        if (galleryGrid) {
            galleryGrid.innerHTML = '';
            const photoWishes = wishes.filter(w => w.photoUrl);

            photoWishes.forEach(wish => {
                const card = document.createElement('div');
                card.className = 'gallery-card relative overflow-hidden rounded-2xl group shadow-md';
                card.style.position = 'relative';
                card.style.borderRadius = '1rem';
                card.style.overflow = 'hidden';
                card.style.aspectRatio = '1 / 1';

                card.innerHTML = `
                    <img src="${escapeHTML(wish.photoUrl)}" alt="Photo memory with Temi" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
                    <div style="position: absolute; bottom: 12px; left: 12px; z-index: 10; background: rgba(0,0,0,0.65); backdrop-filter: blur(4px); color: #ffffff; font-size: 0.75rem; font-weight: 600; padding: 4px 12px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 4px 12px rgba(0,0,0,0.3); pointer-events: none;">
                        ${escapeHTML(wish.sender)} and Temi
                    </div>
                `;
                galleryGrid.appendChild(card);
            });
        }
    }

    function createWishCard(wish) {
        const card = document.createElement('div');
        card.className = 'wish-card';
        card.setAttribute('data-id', wish.id);

        const initial = wish.sender ? wish.sender.charAt(0).toUpperCase() : 'T';
        const photoHTML = wish.photoUrl ? `<div class="card-memory-photo"><img src="${escapeHTML(wish.photoUrl)}" alt="Memory photo with Temi" loading="lazy"></div>` : '';

        card.innerHTML = `
            ${photoHTML}
            <div class="card-quote-icon">“</div>
            <p class="card-message">${escapeHTML(wish.message)}</p>

            <div class="card-footer">
                <div class="sender-info">
                    <div class="sender-avatar">${escapeHTML(initial)}</div>
                    <div class="sender-details">
                        <span class="sender-name">${escapeHTML(wish.sender)}</span>
                        <span class="wish-date">${escapeHTML(wish.date || 'Today')}</span>
                    </div>
                </div>

                <button class="love-react-btn" data-action="love" title="Send love for this wish">
                    ❤️ <span class="love-count">${wish.loves || 0}</span>
                </button>
            </div>
        `;

        return card;
    }

    function goToSlide(index) {
        if (isGridView) return;

        const maxIndex = wishes.length - 1;
        if (index < 0) index = 0;
        if (index > maxIndex) index = maxIndex;

        currentSlideIndex = index;
        updateCarouselPosition();
    }

    function updateCarouselPosition() {
        const track = document.getElementById('carousel-track');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        const dots = document.querySelectorAll('.carousel-pagination .dot');

        if (isGridView) {
            if (prevBtn) prevBtn.disabled = true;
            if (nextBtn) nextBtn.disabled = true;
            return;
        }

        const cardWidth = 320;
        const gap = 24;
        const offset = -(currentSlideIndex * (cardWidth + gap));
        
        if (track) {
            track.style.transform = `translateX(${offset}px)`;
        }

        if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
        if (nextBtn) nextBtn.disabled = currentSlideIndex === wishes.length - 1;

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlideIndex);
        });
    }

    // ==========================================
    // Event Handlers & Submissions
    // ==========================================
    function setupEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

        // Form Submit
        const form = document.getElementById('wish-form');
        if (form) form.addEventListener('submit', handleWishSubmit);




        // Temi Message Modal Handlers
        const seeTemisMessageBtn = document.getElementById('see-temis-message-btn');
        const temiMessageModal = document.getElementById('temi-message-modal');
        const closeTemiModal = document.getElementById('close-temi-modal');
        const backToWishesBtn = document.getElementById('back-to-wishes-btn');

        if (seeTemisMessageBtn && temiMessageModal) {
            seeTemisMessageBtn.addEventListener('click', () => {
                temiMessageModal.classList.remove('hidden');
            });
        }

        if (closeTemiModal && temiMessageModal) {
            closeTemiModal.addEventListener('click', () => {
                temiMessageModal.classList.add('hidden');
            });
        }

        if (backToWishesBtn && temiMessageModal) {
            backToWishesBtn.addEventListener('click', () => {
                temiMessageModal.classList.add('hidden');
            });
        }

        // Image file preview text update
        const photoInput = document.getElementById('sender-photo');
        const uploadPromptText = document.getElementById('upload-prompt-text');
        if (photoInput && uploadPromptText) {
            photoInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    uploadPromptText.innerHTML = `<span>📸 Photo Selected: ${escapeHTML(e.target.files[0].name)}</span>`;
                }
            });
        }

        // Wish Card Reactions (Delegation)
        const track = document.getElementById('carousel-track');
        if (track) {
            track.addEventListener('click', (e) => {
                const loveBtn = e.target.closest('[data-action="love"]');
                if (!loveBtn) return;

                const card = e.target.closest('.wish-card');
                const wishId = card.getAttribute('data-id');
                const wish = wishes.find(w => w.id === wishId);

                if (wish) {
                    wish.loves = (wish.loves || 0) + 1;
                    saveWishes();
                    const loveCountSpan = loveBtn.querySelector('.love-count');
                    if (loveCountSpan) loveCountSpan.textContent = wish.loves;
                    showToast(`Sent love to ${wish.sender}'s wish for Temi! ❤️`);
                }
            });
        }

        setupTouchSwiping();
    }

    function handleWishSubmit(e) {
        e.preventDefault();

        const nameInput = document.getElementById('sender-name');
        const messageInput = document.getElementById('sender-message');
        const photoInput = document.getElementById('sender-photo');

        const sender = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (!sender || !message) return;

        const processSubmission = (photoDataUrl = null) => {
            const newWish = {
                id: 'wish-' + Date.now(),
                sender,
                message,
                photoUrl: photoDataUrl,
                date: 'Just now',
                loves: 1,
                timestamp: Date.now()
            };

            wishes.unshift(newWish);
            saveWishes();
            renderWishes();

            triggerConfetti();

            const sectionHeader = document.querySelector('.form-section .section-header');
            if (sectionHeader) sectionHeader.classList.add('hidden');
            document.getElementById('wish-form').classList.add('hidden');
            document.getElementById('wish-success-card').classList.remove('hidden');

            showToast('Your birthday wish for Temi has been posted! 🎉');
        };

        if (photoInput && photoInput.files && photoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                processSubmission(event.target.result);
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            processSubmission(null);
        }
    }

    // Touch Swiping Logic
    function setupTouchSwiping() {
        const container = document.getElementById('carousel-container');
        if (!container) return;

        container.addEventListener('touchstart', (e) => {
            if (isGridView) return;
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (!isDragging || isGridView) return;
            const currentX = e.touches[0].clientX;
            const diffX = startX - currentX;

            if (Math.abs(diffX) > 40) {
                if (diffX > 0) {
                    goToSlide(currentSlideIndex + 1);
                } else {
                    goToSlide(currentSlideIndex - 1);
                }
                isDragging = false;
            }
        }, { passive: true });

        container.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    // UI Helpers & Confetti
    function showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span>❤️</span> <span>${escapeHTML(message)}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    function escapeHTML(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function triggerConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#f43f5e', '#ec4899', '#f59e0b', '#fbbf24', '#a855f7', '#6366f1'];

        for (let i = 0; i < 110; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 18,
                vy: (Math.random() - 0.8) * 18,
                size: Math.random() * 9 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rSpeed: (Math.random() - 0.5) * 12,
                opacity: 1
            });
        }

        let animationFrame;
        const startTime = Date.now();

        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.32;
                p.rotation += p.rSpeed;
                p.opacity -= 0.014;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = Math.max(0, p.opacity);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            });

            if (Date.now() - startTime < 2600) {
                animationFrame = requestAnimationFrame(render);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                cancelAnimationFrame(animationFrame);
            }
        }

        render();
    }

    // Initialize application
    init();
});
