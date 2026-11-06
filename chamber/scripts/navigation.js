document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('#menu-button');
    const navMenu = document.querySelector('#animate-nav');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            
            // Toggle hamburger icon between '☰' (menu) and '✕' (close)
            if (navMenu.classList.contains('open')) {
                menuButton.textContent = '✕';
                menuButton.setAttribute('aria-label', 'Close Navigation Menu');
            } else {
                menuButton.textContent = '☰';
                menuButton.setAttribute('aria-label', 'Open Navigation Menu');
            }
        });
    }
});