; (function () {
    const openItem = item => {
        const container = item.closest('.team__person');
        const contentBlock = container.find('.team__desc');
        const textBlock = contentBlock.find('.team__desc-wrap');
        const calcHeight = textBlock.height();
        const triangleActive = item.find('.triangle');


        container.addClass('active')
        contentBlock.height(calcHeight);
        triangleActive.addClass('activ__triangle');
    };

    const closeElements = container => {
        const items = container.find('.team__desc');
        const itemContainer = container.find('.team__person');
        const itemTriangle = container.find('.triangle');

        itemContainer.removeClass('active');
        items.height(0);
        itemTriangle.removeClass('activ__triangle')
    };



    $('.team__link').on('click', function (e) {
        e.preventDefault();
        const $this = $(e.currentTarget);
        const container = $this.closest('.team');
        const elemContaienr = $this.closest('.team__person');

        if (elemContaienr.hasClass('active')) {
            closeElements(container);
            // triangleElem.addClass('activ-triangle');
        } else {
            closeElements(container);
            openItem($this);

        }

    });

})()







