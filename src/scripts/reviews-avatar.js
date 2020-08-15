; (function () {
    const findBlock = find => {
        return $('.reviews-item').filter((ndx, item) => {
            return $(item).attr('data-link') == find;
        });
    };

    $('.interective-avatar__link').click((e) => {
        e.preventDefault();

        const $this = $(e.currentTarget);
        const target = $this.attr('data-open');
        const itemShow = findBlock(target);
        const curItem = $this.closest('.interective-avatar');

        itemShow.addClass('active').siblings().removeClass('active');
        curItem.addClass('interective-avatar--active').siblings().removeClass('interective-avatar--active');
    });
})()

