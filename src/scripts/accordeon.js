; (function () {
    function accordeon(selector) {
        const acco = document.querySelector(selector);
        const items = acco.querySelector('[data-list]').children;


        acco.addEventListener('click', function (e) {
            e.preventDefault();

            const target = e.target.closest('[data-trigger]');
            const cros = e.target.closest('[data-cross]');
            const cross = e.target.closest('.accordeon__item')


            if (cros) {
                cross.classList.remove('accordeon__item-active');
            }


            if (!target) return;

            const item = target.parentNode;  // li 


            if (item.classList.contains('accordeon__item-active')) {
                item.classList.remove('accordeon__item-active');
            } else {
                for (let i = 0; i < items.length; i++) {
                    items[i].classList.remove('accordeon__item-active');

                }

                item.classList.add('accordeon__item-active');
            }

        })


    };



    new accordeon('#accord');
})()
