const scenarioCards = document.querySelectorAll('.scenario-card');
const scenarioResults = document.getElementById('scenario-results');
let answeredCount = 0;
let correctCount = 0;
const totalScenarios = scenarioCards.length;

scenarioCards.forEach(card => {
    const buttons = card.querySelectorAll('.answer-btn');
    const feedback = card.querySelector('.scenario-feedback');
    const correctAnswer = card.dataset.answer;
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const userChoice = this.dataset.choice;
            const isCorrect = userChoice === correctAnswer;
            
            buttons.forEach(btn => btn.disabled = true);
            
            feedback.classList.add('visible');
            
            if (isCorrect) {
                feedback.classList.add('correct');
                feedback.classList.remove('incorrect');
                correctCount++;
                
                if (correctAnswer === 'safe') {
                    feedback.innerHTML = '<strong>✓ Correct!</strong> This is a safe approach. The person followed proper verification procedures and didn\'t rush into action without confirming legitimacy through trusted channels.';
                } else {
                    feedback.innerHTML = '<strong>✓ Correct!</strong> This is unsafe. ' + getUnsafeExplanation(card);
                }
            } else {
                feedback.classList.add('incorrect');
                feedback.classList.remove('correct');
                
                if (correctAnswer === 'safe') {
                    feedback.innerHTML = '<strong>✗ Incorrect.</strong> This approach is actually safe because proper verification steps were followed. Always verify through trusted, independent channels before taking action.';
                } else {
                    feedback.innerHTML = '<strong>✗ Incorrect.</strong> This is actually unsafe. ' + getUnsafeExplanation(card);
                }
            }
            
            answeredCount++;
            
            if (answeredCount === totalScenarios) {
                showResults();
            }
        });
    });
});

function getUnsafeExplanation(card) {
    const scenarios = {
        1: 'The email address domain is different from the company\'s official domain, urgent language discourages verification, and requests for secrecy are major red flags. Always verify financial requests through known contact methods.',
        3: 'Allowing unauthorized access to secure areas, even when someone seems legitimate, violates security protocols. The person should retrieve their badge or be escorted by security.',
        4: 'Sharing detailed internal information with unverified contacts can enable targeted attacks. Recruiters don\'t need specifics about internal projects or tools during initial contact.'
    };
    
    const cardIndex = Array.from(scenarioCards).indexOf(card) + 1;
    return scenarios[cardIndex] || 'This situation contains multiple red flags that indicate a social engineering attempt.';
}

function showResults() {
    const percentage = (correctCount / totalScenarios) * 100;
    
    scenarioResults.classList.add('visible');
    scenarioResults.classList.remove('excellent', 'good', 'needs-improvement');
    
    let resultMessage = '';
    let resultClass = '';
    
    if (percentage === 100) {
        resultClass = 'excellent';
        resultMessage = `🎉 Perfect Score! ${correctCount}/${totalScenarios} Correct<br><br>You have excellent judgment for identifying social engineering tactics. Your critical thinking skills will help protect your organization!`;
    } else if (percentage >= 80) {
        resultClass = 'excellent';
        resultMessage = `🌟 Great Work! ${correctCount}/${totalScenarios} Correct<br><br>You have strong awareness of social engineering risks. Review the feedback to strengthen your detection skills further.`;
    } else if (percentage >= 60) {
        resultClass = 'good';
        resultMessage = `👍 Good Effort! ${correctCount}/${totalScenarios} Correct<br><br>You're developing good security awareness. Study the red flags and safe practices to improve your judgment.`;
    } else {
        resultClass = 'needs-improvement';
        resultMessage = `⚠️ Needs Improvement: ${correctCount}/${totalScenarios} Correct<br><br>Review the social engineering tactics and safe practices carefully. Remember: when in doubt, verify through trusted channels!`;
    }
    
    scenarioResults.classList.add(resultClass);
    scenarioResults.innerHTML = resultMessage;
    
    scenarioResults.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

const accordionButtons = document.querySelectorAll('.accordion-btn');

accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('active');
        
        const content = this.nextElementSibling;
        
        if (content.classList.contains('active')) {
            content.classList.remove('active');
        } else {
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelectorAll('.accordion-btn').forEach(btn => {
                if (btn !== this) {
                    btn.classList.remove('active');
                }
            });
            content.classList.add('active');
        }
    });
});