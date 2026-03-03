document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    if (currentPage === '' || currentPage === 'index.html') {
        const homeLink = document.querySelector('.nav-link[href="index.html"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
});
