const correctAnswers = {
    q1: 'a',
    q2: 'a',
    q3: 'b',
    q4: 'b',
    q5: 'a',
    q6: 'a',
    q7: 'b',
    q8: 'b',
    q9: 'a',
    q10: 'a'
};

const questionText = {
    q1: 'What is a common sign of phishing?',
    q2: 'Small businesses are targeted because:',
    q3: 'Recommended minimum password length?',
    q4: 'MFA (Multi-Factor Authentication) provides:',
    q5: 'Social engineering relies on:',
    q6: 'Ransomware:',
    q7: 'Suspicious attachments should be:',
    q8: 'Reusing passwords:',
    q9: 'Human error is a major cause of:',
    q10: 'The best defence against social engineering:'
};

const answerText = {
    q1: { a: 'Urgent request for login details', b: 'Official company newsletter', c: 'Internal HR memo' },
    q2: { a: 'They are easier to breach', b: 'They use better security', c: 'They block all emails' },
    q3: { a: '6 characters', b: '12 characters', c: '4 characters' },
    q4: { a: 'Faster logins', b: 'A second verification layer', c: 'Automatic encryption' },
    q5: { a: 'Human manipulation', b: 'Hardware failure', c: 'Faster internet' },
    q6: { a: 'Encrypts files for payment', b: 'Deletes spam', c: 'Boosts system speed' },
    q7: { a: 'Opened immediately', b: 'Reported and avoided', c: 'Forwarded to colleagues' },
    q8: { a: 'Is safe', b: 'Increases breach risk', c: 'Is recommended' },
    q9: { a: 'Security incidents', b: 'Wi-Fi upgrades', c: 'Printer faults' },
    q10: { a: 'Employee awareness training', b: 'Ignoring all emails', c: 'Turning off computers' }
};

document.getElementById('submitQuiz').addEventListener('click', gradeQuiz);

function gradeQuiz() {
    let score = 0;
    let totalQuestions = Object.keys(correctAnswers).length;
    let unanswered = [];
    let reviewItems = [];

    for (let question in correctAnswers) {
        const selected = document.querySelector(`input[name="${question}"]:checked`);
        
        if (!selected) {
            unanswered.push(question);
        } else {
            const userAnswer = selected.value;
            const correct = userAnswer === correctAnswers[question];
            
            if (correct) {
                score++;
            }
            
            reviewItems.push({
                question: question,
                questionText: questionText[question],
                userAnswer: userAnswer,
                correctAnswer: correctAnswers[question],
                isCorrect: correct
            });
        }
    }

    if (unanswered.length > 0) {
        alert(`Please answer all questions before submitting. You have ${unanswered.length} unanswered question(s).`);
        return;
    }

    const percentage = (score / totalQuestions) * 100;
    const resultsDiv = document.getElementById('results');
    
    resultsDiv.classList.add('visible');
    resultsDiv.classList.remove('excellent', 'good', 'needs-improvement');
    
    let resultClass = '';
    let resultTitle = '';
    let resultMessage = '';
    
    if (percentage === 100) {
        resultClass = 'excellent';
        resultTitle = '🎉 Perfect Score!';
        resultMessage = 'Outstanding! You have excellent understanding of cybersecurity principles. You\'re well-equipped to protect your organization from cyber threats.';
    } else if (percentage >= 80) {
        resultClass = 'excellent';
        resultTitle = '🌟 Excellent Work!';
        resultMessage = 'Great job! You have strong cybersecurity awareness. Review the questions you missed to further strengthen your knowledge.';
    } else if (percentage >= 70) {
        resultClass = 'good';
        resultTitle = '👍 Good Job!';
        resultMessage = 'You have a solid foundation in cybersecurity. Review the training modules to improve your understanding of key concepts.';
    } else if (percentage >= 60) {
        resultClass = 'good';
        resultTitle = '📚 Keep Learning!';
        resultMessage = 'You\'re making progress, but there\'s room for improvement. We recommend reviewing the training materials and retaking the quiz.';
    } else {
        resultClass = 'needs-improvement';
        resultTitle = '⚠️ Needs Improvement';
        resultMessage = 'Please review all training modules carefully and retake the quiz. Cybersecurity awareness is critical for protecting your business.';
    }
    
    resultsDiv.classList.add(resultClass);
    
    let reviewHTML = '<div class="question-review">';
    reviewItems.forEach((item, index) => {
        const itemClass = item.isCorrect ? 'correct' : 'incorrect';
        const icon = item.isCorrect ? '✓' : '✗';
        const userAnswerText = answerText[item.question][item.userAnswer];
        const correctAnswerText = answerText[item.question][item.correctAnswer];
        
        reviewHTML += `
            <div class="review-item ${itemClass}">
                <div class="review-question">${icon} Question ${index + 1}: ${item.questionText}</div>
                <div class="review-answer">
                    Your answer: ${userAnswerText}
                    ${!item.isCorrect ? `<br><strong>Correct answer: ${correctAnswerText}</strong>` : ''}
                </div>
            </div>
        `;
    });
    reviewHTML += '</div>';
    
    resultsDiv.innerHTML = `
        <h3>${resultTitle}</h3>
        <div class="score-display">${score}/${totalQuestions}</div>
        <div class="results-message">${resultMessage}</div>
        ${reviewHTML}
    `;
    
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
