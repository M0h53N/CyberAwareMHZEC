const revealBtns = document.querySelectorAll('.reveal-btn');

revealBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const emailCard = this.closest('.email-card');
        const explanation = emailCard.querySelector('.email-explanation');
        
        if (explanation.classList.contains('visible')) {
            explanation.classList.remove('visible');
            this.textContent = 'Reveal Analysis';
        } else {
            explanation.classList.add('visible');
            this.textContent = 'Hide Analysis';
        }
    });
});

const submitBtn = document.getElementById('submit-quiz');
const quizResults = document.getElementById('quiz-results');
const quizEmails = document.querySelectorAll('.quiz-email');

submitBtn.addEventListener('click', function() {
    let correctCount = 0;
    let totalPhishing = 0;
    
    quizEmails.forEach(email => {
        const checkbox = email.querySelector('input[type="checkbox"]');
        const feedback = email.querySelector('.quiz-feedback');
        const answer = email.dataset.answer;
        const isChecked = checkbox.checked;
        
        if (answer === 'phishing') {
            totalPhishing++;
        }
        
        feedback.classList.add('visible');
        
        if (answer === 'phishing' && isChecked) {
            feedback.classList.add('correct');
            feedback.classList.remove('incorrect');
            feedback.textContent = '✓ Correct! This is a phishing attempt.';
            correctCount++;
        } else if (answer === 'phishing' && !isChecked) {
            feedback.classList.add('incorrect');
            feedback.classList.remove('correct');
            feedback.textContent = '✗ Incorrect. This is actually a phishing email.';
        } else if (answer === 'legitimate' && !isChecked) {
            feedback.classList.add('correct');
            feedback.classList.remove('incorrect');
            feedback.textContent = '✓ Correct! This is a legitimate email.';
            correctCount++;
        } else if (answer === 'legitimate' && isChecked) {
            feedback.classList.add('incorrect');
            feedback.classList.remove('correct');
            feedback.textContent = '✗ Incorrect. This is a legitimate email.';
        }
    });
    
    const totalQuestions = quizEmails.length;
    const percentage = (correctCount / totalQuestions) * 100;
    
    quizResults.classList.add('visible');
    quizResults.classList.remove('excellent', 'good', 'needs-improvement');
    
    let resultMessage = '';
    let resultClass = '';
    
    if (percentage === 100) {
        resultClass = 'excellent';
        resultMessage = `🎉 Perfect Score! ${correctCount}/${totalQuestions} Correct<br><br>You have excellent phishing detection skills! Keep up the vigilant approach.`;
    } else if (percentage >= 80) {
        resultClass = 'excellent';
        resultMessage = `🌟 Excellent! ${correctCount}/${totalQuestions} Correct<br><br>You have strong phishing detection skills. Review the feedback to perfect your awareness.`;
    } else if (percentage >= 60) {
        resultClass = 'good';
        resultMessage = `👍 Good Job! ${correctCount}/${totalQuestions} Correct<br><br>You're on the right track. Review the warning signs to improve your detection rate.`;
    } else {
        resultClass = 'needs-improvement';
        resultMessage = `⚠️ Needs Improvement: ${correctCount}/${totalQuestions} Correct<br><br>Review the phishing warning signs carefully and try again. Practice makes perfect!`;
    }
    
    quizResults.classList.add(resultClass);
    quizResults.innerHTML = resultMessage;
    
    quizResults.scrollIntoView({ behavior: 'smooth', block: 'center' });
});