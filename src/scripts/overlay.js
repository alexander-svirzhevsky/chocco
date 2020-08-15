; (function () {
    const burger = document.querySelector('.hamburger');
    const close = document.querySelector('.overlay__close');
    const overlay = document.querySelector('.overlay');
    const myBody = document.querySelector('body');

    burger.addEventListener('click', function () {
        overlay.classList.add('overlay-open');
        myBody.classList.add('lock');
    });

    close.addEventListener('click', function () {
        overlay.classList.remove('overlay-open');
        myBody.classList.remove('lock');
    })

    overlay.addEventListener('click', function () {
        overlay.classList.remove('overlay-open');
        myBody.classList.remove('lock');
    })
})()



