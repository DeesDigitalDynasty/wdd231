const menuButton = document.querySelector('#menu-button');
const nav = document.querySelector('#animate-nav');

menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuButton.textContent = nav.classList.contains('open') ? 'X' : '☰';
});