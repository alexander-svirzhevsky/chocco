; (function () {
    const slider = $('.slider').bxSlider({
        pager: false,
        controls: false,
    });

    $('.arrow-img--right').click(e => {
        e.preventDefault();

        slider.goToNextSlide();
    });

    $('.arrow-img--left').click(e => {
        e.preventDefault();

        slider.goToPrevSlide();
    });
})()

