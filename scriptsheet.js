const menu = document.querySelector( '.menu-toggle');
const navL = document.querySelector('.nav-links');
const nav = document.querySelector('.nav');


menu.addEventListener('click', () => {
    navL.classList.toggle('active');
    const icon = menu.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});


document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !menu.contains(event.target)) {
        navL.classList.remove('active');
        const icon = menu.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
    }
});
