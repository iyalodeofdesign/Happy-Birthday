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

    // Heartfelt Initial Wishes Dedicated to Temi
    const SAMPLE_WISHES = [
        {
            id: 'wish-1',
            sender: 'Sarah M.',
            message: 'Happy Birthday Temi! 🥳 Wishing you the most incredible year filled with laughter, big wins, and endless joy. So blessed to know you!',
            date: 'Today',
            loves: 5,
            timestamp: Date.now() - 100000
        },
        {
            id: 'wish-2',
            sender: 'Uncle Dave & Family',
            message: 'Temi, you bring so much warmth and light into every room you step into. Hope today is as special as you are! Happy Birthday!',
            date: 'Today',
            loves: 8,
            timestamp: Date.now() - 200000
        },
        {
            id: 'wish-3',
            sender: 'Chidimma',
            message: 'To my amazing friend Temi 🎉 Happy Birthday! Thank you for always being there with great advice and the best energy. Cheers to another year of greatness!',
            date: 'Yesterday',
            loves: 12,
            timestamp: Date.now() - 300000
        },
        {
            id: 'wish-4',
            sender: 'Marcus (Tech Team)',
            message: 'Happy Birthday Temi! Working alongside you is always a highlight. Wishing you massive success and happiness in all your upcoming projects!',
            date: 'Yesterday',
            loves: 4,
            timestamp: Date.now() - 400000
        },
        {
            id: 'wish-5',
            sender: 'Aunty Grace',
            message: 'Happy Birthday Temi ❤️ May this new chapter bring you peace, good health, and all the happiness your heart can hold!',
            date: '2 days ago',
            loves: 9,
            timestamp: Date.now() - 500000
        },
        {
            id: 'wish-6',
            sender: 'Tobi & Sade',
            message: 'Temi! Another trip around the sun! Hope you get spoiled today and eat plenty of cake 🎂 Keep shining bright!',
            date: '2 days ago',
            loves: 7,
            timestamp: Date.now() - 600000
        }
    ];

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
        const hasSeenIntro = localStorage.getItem(STORAGE_KEY_INTRO);

        if (!introScreen) return;

        if (hasSeenIntro === 'true') {
            introScreen.classList.add('fade-out');
        } else {
            introScreen.classList.remove('fade-out');
        }

        // 'write wish' button on Intro Popup Modal
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
                wishes = [...SAMPLE_WISHES];
            }
        } else {
            wishes = [...SAMPLE_WISHES];
            saveWishes();
        }
    }

    function saveWishes() {
        localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(wishes));
        updateWishesCounter();
    }

    function loadTheme() {
        const storedTheme = localStorage.getItem(STORAGE_KEY_THEME) || 'dark';
        document.documentElement.setAttribute('data-theme', storedTheme);
        updateThemeIcon(storedTheme);
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(STORAGE_KEY_THEME, next);
        updateThemeIcon(next);
        showToast(`Switched to ${next} theme 🌓`);
    }

    function updateThemeIcon(theme) {
        const span = document.querySelector('#theme-toggle .theme-icon');
        if (span) {
            span.textContent = theme === 'dark' ? '🌙' : '☀️';
        }
    }

    // ==========================================
    // Render Wishes & Carousel Logic
    // ==========================================
    function updateWishesCounter() {
        const count = wishes.length;
        const countPill = document.getElementById('counter-count');
        const heroCounter = document.getElementById('hero-counter-text');

        if (countPill) countPill.textContent = count;
        if (heroCounter) {
            heroCounter.textContent = `${count} people celebrating Temi today ❤️`;
        }
    }

    function renderWishes() {
        const track = document.getElementById('carousel-track');
        const dotsContainer = document.getElementById('carousel-dots');
        if (!track) return;

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

    function createWishCard(wish) {
        const card = document.createElement('div');
        card.className = 'wish-card';
        card.setAttribute('data-id', wish.id);

        const initial = wish.sender ? wish.sender.charAt(0).toUpperCase() : 'T';

        card.innerHTML = `
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

        // Carousel Controls
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');

        if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlideIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlideIndex + 1));

        // Toggle Grid vs Carousel View
        const toggleViewBtn = document.getElementById('toggle-view-btn');
        if (toggleViewBtn) {
            toggleViewBtn.addEventListener('click', () => {
                isGridView = !isGridView;
                const track = document.getElementById('carousel-track');
                const textSpan = document.getElementById('toggle-view-text');

                if (isGridView) {
                    track.classList.add('grid-mode');
                    textSpan.textContent = '🎡 Switch to Carousel View';
                } else {
                    track.classList.remove('grid-mode');
                    textSpan.textContent = '📱 Switch to Grid View';
                }
                renderWishes();
            });
        }

        // Celebrate Confetti Button
        const celebrateBtn = document.getElementById('celebrate-temi-btn');
        if (celebrateBtn) {
            celebrateBtn.addEventListener('click', () => {
                triggerConfetti();
                showToast('Confetti shower for Temi! 🎉🎂');
            });
        }

        // Success State Buttons
        const writeAnotherBtn = document.getElementById('write-another-btn');
        if (writeAnotherBtn) {
            writeAnotherBtn.addEventListener('click', () => {
                document.getElementById('wish-form').reset();
                document.getElementById('wish-form').classList.remove('hidden');
                document.getElementById('wish-success-card').classList.add('hidden');
                document.getElementById('char-count').textContent = '0';
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

        const sender = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (!sender || !message) return;

        const newWish = {
            id: 'wish-' + Date.now(),
            sender,
            message,
            date: 'Just now',
            loves: 1,
            timestamp: Date.now()
        };

        wishes.unshift(newWish);
        saveWishes();
        renderWishes();

        triggerConfetti();

        document.getElementById('wish-form').classList.add('hidden');
        document.getElementById('wish-success-card').classList.remove('hidden');

        showToast('Your birthday wish for Temi has been posted! 🎉');
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
