// ============ БУРГЕР-МЕНЮ ============
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!burger || !mobileMenu) return;

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('open');
        });
    });

    document.addEventListener('click', (e) => {
        if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
            burger.classList.remove('active');
            mobileMenu.classList.remove('open');
        }
    });
});

// ============ АНИМАЦИЯ ПРИ СКРОЛЛЕ ============
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
});

// ============ МОДАЛЬНОЕ ОКНО ============
document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const openModalBtns = document.querySelectorAll('.open-modal');

    if (!modalOverlay || !modalClose) return;

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.classList.add('active');
            document.body.classList.add('modal-open');
        });
    });

    modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
});

// ============ ЛОГИКА ОПРОСНИКА (КВИЗ) ============
document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quizForm');
    if (!quizForm) return;

    const steps = quizForm.querySelectorAll('.quiz-step');
    const progressBar = document.getElementById('quizProgress');
    const progressText = document.getElementById('quizProgressText');
    const totalSteps = steps.length;

    const updateProgress = (currentStep) => {
        const percent = (currentStep / totalSteps) * 100;
        if (progressBar) progressBar.style.width = `${percent}%`;
        if (progressText) progressText.textContent = `Шаг ${currentStep} из ${totalSteps}`;
    };

    const showStep = (stepNumber) => {
        steps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === stepNumber) {
                step.classList.add('active');
            }
        });
        updateProgress(stepNumber);
    };

    // Обработка кликов по кнопкам
    quizForm.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-next')) {
            const nextStep = parseInt(e.target.dataset.next);
            showStep(nextStep);
        }
        if (e.target.classList.contains('btn-prev')) {
            const prevStep = parseInt(e.target.dataset.prev);
            showStep(prevStep);
        }
    });

    updateProgress(1);
});

// ============ СЛАЙДЕР В ОПРОСНИКЕ ============
document.addEventListener('DOMContentLoaded', () => {
    const sliderButtons = document.querySelectorAll('.slider-btn');

    sliderButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Чтобы не отправлялась форма
            const sliderId = btn.dataset.slider;
            const container = document.querySelector(`.slider-container[data-slider-id="${sliderId}"]`);
            
            if (!container) return;

            // Ширина одной карточки + отступ (примерно 215px)
            const scrollAmount = 215; 
            
            if (btn.classList.contains('next')) {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else if (btn.classList.contains('prev')) {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });
    });
});
