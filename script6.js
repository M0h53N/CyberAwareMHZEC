const emails = [
    {
        id: 1,
        from: 'paypal-security@paypa1-alerts.com',
        fromDisplay: 'PayPal Security <paypal-security@paypa1-alerts.com>',
        to: 'you@company.com',
        subject: 'Urgent: Your Account Has Been Limited',
        date: 'Mon, 18 Nov 2024 14:23:45 +0000',
        returnPath: 'bounce@suspicious-mailer.net',
        spf: 'FAIL',
        body: `<p>Dear Valued Customer,</p>
               <p>We have detected unusual activity on your PayPal account and have temporarily limited your access for your protection.</p>
               <p><strong>IMMEDIATE ACTION REQUIRED</strong></p>
               <p>To restore full access to your account, please verify your identity within 24 hours by clicking the link below:</p>
               <p><a href="#" data-real-url="http://paypal-verify-secure.net/login.php">Verify Your Account Now</a></p>
               <p>Failure to verify will result in permanent account suspension.</p>
               <p>Thank you for your cooperation,<br>PayPal Security Team</p>`,
        attachments: [],
        isPhishing: true,
        redFlags: [
            'Domain uses "paypa1" with number 1 instead of letter l',
            'Return-Path domain differs from sender domain',
            'SPF check failed - email not authorized by PayPal',
            'Creates urgency with 24-hour deadline and threats',
            'Link URL goes to suspicious domain, not paypal.com',
            'Generic greeting instead of account holder name'
        ]
    },
    {
        id: 2,
        from: 'notifications@github.com',
        fromDisplay: 'GitHub <notifications@github.com>',
        to: 'you@company.com',
        subject: '[your-repo] New pull request #234',
        date: 'Mon, 18 Nov 2024 09:15:22 +0000',
        returnPath: 'notifications@github.com',
        spf: 'PASS',
        body: `<p>Hi there,</p>
               <p>Sarah Martinez opened a new pull request in your-repo/main-project:</p>
               <p><strong>Pull Request #234: Update authentication middleware</strong></p>
               <p>Review the changes at: <a href="#" data-real-url="https://github.com/your-repo/main-project/pull/234">https://github.com/your-repo/main-project/pull/234</a></p>
               <p>Best,<br>The GitHub Team</p>`,
        attachments: [],
        isPhishing: false,
        legitimateReasons: [
            'Email from official github.com domain',
            'Return-Path matches sender domain',
            'SPF check passed - authorized sender',
            'Specific details about repository and pull request',
            'URL points to legitimate github.com domain',
            'No urgent demands or threats',
            'Professional tone and formatting'
        ]
    },
    {
        id: 3,
        from: 'it-support@company-helpdesk.org',
        fromDisplay: 'IT Support <it-support@company-helpdesk.org>',
        to: 'you@company.com',
        subject: 'URGENT: Password Expiration in 2 Hours',
        date: 'Mon, 18 Nov 2024 16:45:10 +0000',
        returnPath: 'mailer@bulk-sender-123.net',
        spf: 'SOFTFAIL',
        body: `<p>Dear Employee,</p>
               <p>Your company password will expire in 2 hours due to our new security policy.</p>
               <p>To avoid losing access to your email and all company systems, you must reset your password immediately.</p>
               <p><a href="#" data-real-url="http://company-password-reset.org/update.php?user=you">Click here to reset your password</a></p>
               <p>If you do not complete this within 2 hours, your account will be locked and you will need to contact IT support in person with government-issued ID.</p>
               <p>IT Support Team<br>This is an automated message. Do not reply to this email.</p>`,
        attachments: [],
        isPhishing: true,
        redFlags: [
            'Sender domain (.org) does not match company domain',
            'Return-Path shows bulk mailer service',
            'SPF SOFTFAIL indicates questionable authentication',
            'Creates artificial urgency (2 hours)',
            'External domain for password reset, not internal system',
            'Threatens account lockage',
            'Generic greeting without employee name',
            'Discourages verification ("do not reply")'
        ]
    },
    {
        id: 4,
        from: 'invoices@dropbox.com',
        fromDisplay: 'Dropbox <invoices@dropbox.com>',
        to: 'you@company.com',
        subject: 'Your Dropbox Business invoice is ready',
        date: 'Mon, 18 Nov 2024 11:30:00 +0000',
        returnPath: 'bounce@dropbox.com',
        spf: 'PASS',
        body: `<p>Hello,</p>
               <p>Your November invoice for Dropbox Business is now available.</p>
               <p><strong>Invoice Date:</strong> November 18, 2024<br>
               <strong>Amount:</strong> $150.00<br>
               <strong>Payment Method:</strong> Visa ending in 4242</p>
               <p>View your invoice: <a href="#" data-real-url="https://www.dropbox.com/business/invoice/2024-11">https://www.dropbox.com/business/invoice/2024-11</a></p>
               <p>If you have questions about your bill, visit our <a href="#" data-real-url="https://help.dropbox.com/billing">billing help center</a>.</p>
               <p>Thanks,<br>The Dropbox Team</p>`,
        attachments: [],
        isPhishing: false,
        legitimateReasons: [
            'Official dropbox.com domain',
            'Return-Path matches sender domain',
            'SPF check passed',
            'Specific invoice details with dates and amounts',
            'All URLs point to legitimate dropbox.com domains',
            'No urgent demands or threats',
            'Professional formatting',
            'References existing business relationship'
        ]
    },
    {
        id: 5,
        from: 'ceo@company-office.net',
        fromDisplay: 'Michael Chen <ceo@company-office.net>',
        to: 'you@company.com',
        subject: 'URGENT: Wire Transfer Needed Today',
        date: 'Mon, 18 Nov 2024 15:20:33 +0000',
        returnPath: 'sender@webmail-server-45.com',
        spf: 'NONE',
        body: `<p>Hi,</p>
               <p>I'm in a meeting with investors and need you to process an urgent wire transfer immediately.</p>
               <p><strong>Amount:</strong> $45,000<br>
               <strong>Recipient:</strong> New Vendor Solutions LLC<br>
               <strong>Account Number:</strong> 8829374652<br>
               <strong>Routing Number:</strong> 121000248</p>
               <p>This is for a confidential acquisition - do not discuss with anyone including accounting. Time sensitive, please send confirmation once complete.</p>
               <p>I'm in back-to-back meetings so don't call me, just handle it.</p>
               <p>Thanks,<br>Michael</p>`,
        attachments: [],
        isPhishing: true,
        redFlags: [
            'Domain is .net instead of company domain',
            'Return-Path shows generic webmail server',
            'No SPF record - highly suspicious',
            'CEO impersonation - common BEC (Business Email Compromise) attack',
            'Requests secrecy ("do not discuss with anyone")',
            'Creates urgency and pressure',
            'Discourages verification ("don\'t call me")',
            'Large financial transaction with no proper authorization',
            'Unusual informal tone for CEO'
        ]
    },
    {
        id: 6,
        from: 'shipping@fedex.com',
        fromDisplay: 'FedEx Tracking <shipping@fedex.com>',
        to: 'you@company.com',
        subject: 'Package Delivery Scheduled for Today',
        date: 'Mon, 18 Nov 2024 08:45:12 +0000',
        returnPath: 'tracking@fedex.com',
        spf: 'PASS',
        body: `<p>Your package is out for delivery</p>
               <p><strong>Tracking Number:</strong> 7849 2938 4756<br>
               <strong>Delivery Date:</strong> Monday, November 18, 2024<br>
               <strong>Estimated Time:</strong> By 4:30 PM</p>
               <p>Track your package: <a href="#" data-real-url="https://www.fedex.com/track?trackingnumber=78492938475">Track Package</a></p>
               <p>Delivery updates will be sent to this email address.</p>
               <p>Thank you for choosing FedEx.</p>`,
        attachments: [],
        isPhishing: false,
        legitimateReasons: [
            'Official fedex.com domain',
            'Return-Path matches sender domain',
            'SPF check passed',
            'Specific tracking number provided',
            'URL goes to legitimate fedex.com',
            'No requests for personal information',
            'Professional formatting',
            'Standard delivery notification content'
        ]
    },
    {
        id: 7,
        from: 'security@micros0ft-account.com',
        fromDisplay: 'Microsoft Security <security@micros0ft-account.com>',
        to: 'you@company.com',
        subject: 'Security Alert: Unusual Sign-In Activity',
        date: 'Mon, 18 Nov 2024 13:12:45 +0000',
        returnPath: 'noreply@mail-sender-global.net',
        spf: 'FAIL',
        body: `<p>Microsoft Account Security Alert</p>
               <p>We detected an unusual sign-in to your account from:</p>
               <p><strong>Location:</strong> Moscow, Russia<br>
               <strong>Device:</strong> Unknown Windows PC<br>
               <strong>Time:</strong> November 18, 2024 1:05 PM GMT</p>
               <p>If this was you, you can safely ignore this email.</p>
               <p>If this wasn't you, secure your account immediately:</p>
               <p><a href="#" data-real-url="http://microsoft-secure-verify.com/login">Secure Your Account</a></p>`,
        attachments: ['SecurityReport.exe'],
        isPhishing: true,
        redFlags: [
            'Domain uses "micros0ft" with zero instead of o',
            'Return-Path from generic mail sender',
            'SPF check failed',
            'Suspicious .exe attachment',
            'Link URL is not microsoft.com',
            'Creates fear with foreign login location',
            'Attachment could contain malware'
        ]
    },
    {
        id: 8,
        from: 'orders-noreply@amazon.com',
        fromDisplay: 'Amazon.com <orders-noreply@amazon.com>',
        to: 'you@company.com',
        subject: 'Your Amazon.com order #112-9384756-2847392',
        date: 'Mon, 18 Nov 2024 10:22:18 +0000',
        returnPath: 'bounce@amazon.com',
        spf: 'PASS',
        body: `<p>Hello,</p>
               <p>Your order has been shipped and will arrive by Wednesday, November 20, 2024.</p>
               <p><strong>Order #:</strong> 112-9384756-2847392<br>
               <strong>Items:</strong> Logitech MX Master 3 Mouse<br>
               <strong>Delivery Address:</strong> 123 Main St, Your City</p>
               <p>Track your package: <a href="#" data-real-url="https://www.amazon.com/progress-tracker?orderId=112-9384756-2847392">Track Package</a></p>
               <p>View or manage your order: <a href="#" data-real-url="https://www.amazon.com/your-orders">Your Orders</a></p>`,
        attachments: [],
        isPhishing: false,
        legitimateReasons: [
            'Official amazon.com domain',
            'Return-Path matches sender domain',
            'SPF check passed',
            'Specific order number and details',
            'All URLs point to amazon.com',
            'No requests for payment or personal info',
            'Expected notification for online order'
        ]
    }
];

let currentEmailIndex = 0;
let correctDecisions = 0;
let totalReviewed = 0;

function loadEmail(index) {
    const email = emails[index];
    const container = document.getElementById('emailContainer');
    
    const emailHTML = `
        <div class="email-client" id="email-${email.id}">
            <div class="email-toolbar">
                <span class="email-number">Email ${index + 1} of ${emails.length}</span>
                <span class="email-status">Pending Review</span>
            </div>
            
            <div class="email-header" onclick="toggleDetails(${email.id})">
                <div class="email-header-line">
                    <span class="header-label">From:</span>
                    <span class="header-value">${email.fromDisplay}</span>
                </div>
                <div class="email-header-line">
                    <span class="header-label">To:</span>
                    <span class="header-value">${email.to}</span>
                </div>
                <div class="email-header-line">
                    <span class="header-label">Subject:</span>
                    <span class="header-value">${email.subject}</span>
                </div>
                <div class="email-header-line">
                    <span class="header-label">Date:</span>
                    <span class="header-value">${email.date}</span>
                </div>
                <div class="header-expand">▼ Click to view technical details</div>
            </div>
            
            <div class="email-details" id="details-${email.id}">
                <div class="detail-section">
                    <div class="detail-label">Return-Path</div>
                    <div class="detail-value">${email.returnPath}</div>
                </div>
                <div class="detail-section">
                    <div class="detail-label">SPF Authentication</div>
                    <div class="detail-value">${email.spf}</div>
                </div>
                <div class="detail-section">
                    <div class="detail-label">Full From Address</div>
                    <div class="detail-value">${email.from}</div>
                </div>
            </div>
            
            <div class="email-body">
                ${email.body}
            </div>
            
            ${email.attachments.length > 0 ? `
                <div class="email-attachments">
                    <div class="attachment-label">⚠️ Attachments:</div>
                    ${email.attachments.map(att => `<span class="attachment-item">📎 ${att}</span>`).join('')}
                </div>
            ` : ''}
            
            <div class="email-actions">
                <button class="action-btn allow-btn" onclick="makeDecision(${email.id}, false)">
                    ✅ Allow (Legitimate)
                </button>
                <button class="action-btn block-btn" onclick="makeDecision(${email.id}, true)">
                    🚫 Block (Phishing)
                </button>
            </div>
            
            <div class="email-feedback" id="feedback-${email.id}"></div>
        </div>
    `;
    
    container.innerHTML = emailHTML;
}

function toggleDetails(emailId) {
    const details = document.getElementById(`details-${emailId}`);
    details.classList.toggle('visible');
}

function makeDecision(emailId, userSaysPhishing) {
    const email = emails.find(e => e.id === emailId);
    const isCorrect = userSaysPhishing === email.isPhishing;
    
    totalReviewed++;
    if (isCorrect) correctDecisions++;
    
    updateStats();
    
    const emailClient = document.getElementById(`email-${emailId}`);
    const feedback = document.getElementById(`feedback-${emailId}`);
    const buttons = emailClient.querySelectorAll('.action-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    emailClient.classList.add('reviewed');
    
    feedback.classList.add('visible');
    feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    let feedbackHTML = '';
    
    if (isCorrect) {
        if (email.isPhishing) {
            feedbackHTML = `
                <div class="feedback-title">✅ Correct! This is a phishing email.</div>
                <div class="feedback-explanation">
                    <strong>Key Red Flags You Should Have Noticed:</strong>
                    <ul class="red-flags-list">
                        ${email.redFlags.map(flag => `<li>${flag}</li>`).join('')}
                    </ul>
                </div>
            `;
        } else {
            feedbackHTML = `
                <div class="feedback-title">✅ Correct! This is a legitimate email.</div>
                <div class="feedback-explanation">
                    <strong>Trust Indicators:</strong>
                    <ul class="red-flags-list">
                        ${email.legitimateReasons.map(reason => `<li>${reason}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
    } else {
        if (email.isPhishing) {
            feedbackHTML = `
                <div class="feedback-title">❌ Incorrect - This WAS a phishing attempt!</div>
                <div class="feedback-explanation">
                    <strong>Red Flags You Missed:</strong>
                    <ul class="red-flags-list">
                        ${email.redFlags.map(flag => `<li>${flag}</li>`).join('')}
                    </ul>
                    <p style="margin-top: 15px;"><strong>⚠️ In a real scenario, allowing this email could have compromised your organization!</strong></p>
                </div>
            `;
        } else {
            feedbackHTML = `
                <div class="feedback-title">❌ Incorrect - This was actually legitimate!</div>
                <div class="feedback-explanation">
                    <strong>Why This Email Was Safe:</strong>
                    <ul class="red-flags-list">
                        ${email.legitimateReasons.map(reason => `<li>${reason}</li>`).join('')}
                    </ul>
                    <p style="margin-top: 15px;"><strong>⚠️ Being too cautious is better than being careless, but this would have blocked legitimate business communication.</strong></p>
                </div>
            `;
        }
    }
    
    feedback.innerHTML = feedbackHTML;
    
    setTimeout(() => {
        currentEmailIndex++;
        if (currentEmailIndex < emails.length) {
            feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                loadEmail(currentEmailIndex);
            }, 2000);
        } else {
            showFinalResults();
        }
    }, 1000);
}

function updateStats() {
    document.getElementById('emailsReviewed').textContent = totalReviewed;
    document.getElementById('correctDecisions').textContent = correctDecisions;
    const accuracy = totalReviewed > 0 ? Math.round((correctDecisions / totalReviewed) * 100) : 0;
    document.getElementById('accuracy').textContent = accuracy + '%';
}

function showFinalResults() {
    const resultsDiv = document.getElementById('labResults');
    const percentage = Math.round((correctDecisions / totalReviewed) * 100);
    
    let resultClass = '';
    let resultTitle = '';
    let resultMessage = '';
    
    if (percentage === 100) {
        resultClass = 'excellent';
        resultTitle = '🎉 Perfect Score - Security Expert!';
        resultMessage = 'Outstanding! You correctly identified every phishing attempt and legitimate email. You have the skills to protect your organization from email-based threats.';
    } else if (percentage >= 87) {
        resultClass = 'excellent';
        resultTitle = '🌟 Excellent Performance!';
        resultMessage = 'Great work! You demonstrated strong phishing detection skills. Review the emails you missed to perfect your awareness.';
    } else if (percentage >= 75) {
        resultClass = 'good';
        resultTitle = '👍 Good Job!';
        resultMessage = 'You have solid phishing detection abilities, but there\'s room for improvement. Pay closer attention to sender domains, SPF records, and urgency tactics.';
    } else if (percentage >= 62) {
        resultClass = 'good';
        resultTitle = '📚 Keep Practicing!';
        resultMessage = 'You\'re developing your skills, but need more practice. Review the training materials and pay special attention to email headers and sender authentication.';
    } else {
        resultClass = 'needs-improvement';
        resultTitle = '⚠️ Needs Improvement';
        resultMessage = 'Your organization would be at significant risk. Please review all training modules carefully and retake this lab. Focus on examining sender domains, SPF checks, and link URLs.';
    }
    
    resultsDiv.classList.add('visible', resultClass);
    resultsDiv.innerHTML = `
        <div class="results-title">${resultTitle}</div>
        <div class="results-score">${correctDecisions}/${totalReviewed} Correct</div>
        <div class="results-message">${resultMessage}</div>
        <div class="performance-breakdown">
            <div class="breakdown-item">
                <div class="breakdown-label">Accuracy Rate</div>
                <div class="breakdown-value">${percentage}%</div>
            </div>
            <div class="breakdown-item">
                <div class="breakdown-label">Phishing Blocked</div>
                <div class="breakdown-value">${emails.filter(e => e.isPhishing).length} total</div>
            </div>
            <div class="breakdown-item">
                <div class="breakdown-label">Legitimate Allowed</div>
                <div class="breakdown-value">${emails.filter(e => !e.isPhishing).length} total</div>
            </div>
        </div>
    `;
    
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('restartBtn').classList.remove('hidden');
}

document.getElementById('restartBtn').addEventListener('click', function() {
    currentEmailIndex = 0;
    correctDecisions = 0;
    totalReviewed = 0;
    updateStats();
    document.getElementById('labResults').classList.remove('visible');
    this.classList.add('hidden');
    loadEmail(0);
});

loadEmail(0);
