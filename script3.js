let currentSlide = 0;
const cards = document.querySelectorAll('.content-card');
const totalSlides = cards.length;
const dotsContainer = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    cards.forEach((card, i) => {
        if (i === index) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });

    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

const passwordInput = document.getElementById('password-input');
const showPasswordCheckbox = document.getElementById('show-password');
const strengthText = document.getElementById('strength-text');
const strengthBar = document.getElementById('strength-bar');
const feedbackText = document.getElementById('feedback-text');
const crackTime = document.getElementById('crack-time');

showPasswordCheckbox.addEventListener('change', function() {
    passwordInput.type = this.checked ? 'text' : 'password';
});

passwordInput.addEventListener('input', function() {
    const password = this.value;
    
    if (password.length === 0) {
        resetDisplay();
        return;
    }
    
    const analysis = analyzePassword(password);
    updateDisplay(analysis);
});

function analyzePassword(password) {
    const length = password.length;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);
    
    let charsetSize = 0;
    if (hasLower) charsetSize += 26;
    if (hasUpper) charsetSize += 26;
    if (hasNumber) charsetSize += 10;
    if (hasSymbol) charsetSize += 32;
    
    const entropy = length * Math.log2(charsetSize);
    
    let strength = 'weak';
    let feedback = '';
    
    if (length < 8) {
        strength = 'weak';
        feedback = 'Your password is too short. Passwords should be at least 12 characters long. Short passwords can be cracked in seconds or minutes.';
    } else if (length < 12) {
        strength = 'weak';
        feedback = 'Your password is below the recommended minimum length. Aim for at least 12 characters. Adding more length significantly increases security.';
    } else if (length >= 12 && length < 16) {
        if (hasLower && hasUpper && hasNumber && hasSymbol) {
            strength = 'medium';
            feedback = 'Your password meets basic requirements with good character variety. For better security, increase the length to 16+ characters.';
        } else if ((hasLower || hasUpper) && hasNumber) {
            strength = 'medium';
            feedback = 'Your password has decent length but limited character variety. Add uppercase, lowercase, numbers, and symbols for better security.';
        } else {
            strength = 'weak';
            feedback = 'Your password lacks character variety. Include a mix of uppercase, lowercase, numbers, and symbols to strengthen it.';
        }
    } else if (length >= 16) {
        if (hasLower && hasUpper && hasNumber && hasSymbol) {
            strength = 'strong';
            feedback = 'Excellent! Your password is long and uses multiple character types. This provides strong protection against brute force attacks.';
        } else if ((hasLower || hasUpper) && (hasNumber || hasSymbol)) {
            strength = 'medium';
            feedback = 'Your password has good length but could be stronger with more character variety. Include uppercase, lowercase, numbers, and symbols.';
        } else {
            strength = 'medium';
            feedback = 'Your password has good length, but adding more character types (uppercase, lowercase, numbers, symbols) would significantly improve it.';
        }
    }
    
    const combinations = Math.pow(charsetSize, length);
    const guessesPerSecond = 10000000000;
    const secondsToCrack = combinations / guessesPerSecond;
    
    return {
        strength: strength,
        feedback: feedback,
        crackTime: secondsToCrack
    };
}

function updateDisplay(analysis) {
    strengthText.textContent = analysis.strength.charAt(0).toUpperCase() + analysis.strength.slice(1);
    strengthText.className = analysis.strength;
    
    strengthBar.className = 'strength-bar ' + analysis.strength;
    
    feedbackText.textContent = analysis.feedback;
    
    crackTime.textContent = formatTime(analysis.crackTime);
}

function formatTime(seconds) {
    if (seconds < 1) {
        return 'Instant';
    } else if (seconds < 60) {
        return seconds.toFixed(2) + ' seconds';
    } else if (seconds < 3600) {
        const minutes = seconds / 60;
        return minutes.toFixed(2) + ' minutes';
    } else if (seconds < 86400) {
        const hours = seconds / 3600;
        return hours.toFixed(2) + ' hours';
    } else if (seconds < 31536000) {
        const days = seconds / 86400;
        return days.toFixed(2) + ' days';
    } else if (seconds < 3153600000) {
        const years = seconds / 31536000;
        return years.toFixed(2) + ' years';
    } else if (seconds < 31536000000) {
        const centuries = seconds / 3153600000;
        return centuries.toFixed(2) + ' centuries';
    } else {
        return 'Millions of years';
    }
}

function resetDisplay() {
    strengthText.textContent = '-';
    strengthText.className = '';
    strengthBar.className = 'strength-bar';
    feedbackText.textContent = 'Enter a password to see its strength analysis.';
    crackTime.textContent = '-';
}

const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
const progressCount = document.getElementById('progress-count');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
});

function updateProgress() {
    const checkedCount = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked').length;
    progressCount.textContent = checkedCount;
}