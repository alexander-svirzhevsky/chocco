; (function () {
    const mesureWidth = item => {
        let reqItemWidth = 0;
        const screenWidth = $(window).width();
        const container = item.closest('.accordeon__list');
        const titlesBlocks = container.find('.accordeon__active');
        const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

        const textContainer = item.find('.accordeon__text');
        const paddingLeft = parseInt(textContainer.css('padding-left'));
        const paddingRight = parseInt(textContainer.css('padding-right'));


        const isMobil = window.matchMedia('(max-width: 768px)').matches;

        if (isMobil) {
            reqItemWidth = screenWidth - titlesWidth;
        } else {
            reqItemWidth = 530;
        }

        return {
            container: reqItemWidth,
            textContainer: reqItemWidth - paddingRight - paddingLeft
        }

    };


    const closeEveryItemInContainer = container => {
        const items = container.find('.accordeon__item');
        const content = container.find('.accordeon__wrap');

        items.removeClass('active');
        content.width(0);
    };

    const openItemm = item => {
        const hiddenContent = item.find('.accordeon__wrap');
        const reqWidth = mesureWidth(item);
        const textBlock = item.find('.accordeon__text')

        item.addClass('active');
        hiddenContent.width(reqWidth.container);
        textBlock.width(reqWidth.textContainer);
    };

    $('.accordeon__active').on('click', e => {
        e.preventDefault();

        const $this = $(e.currentTarget);
        const item = $this.closest('.accordeon__item');
        const itemOpened = item.hasClass('active');
        const container = $this.closest('.accordeon__list')

        if (itemOpened) {
            closeEveryItemInContainer(container)
        } else {
            closeEveryItemInContainer(container)
            openItemm(item);
        }
    });

    $('.accordeon__close').on('click', e => {
        e.preventDefault();
        closeEveryItemInContainer($('.accordeon__item'))
    });
})()
