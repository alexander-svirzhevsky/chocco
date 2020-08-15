; (function () {

    const sections = $('.section');
    const display = $('.maincontent');
    const sidemenu = $('.menu-fixed');
    const menuItems = sidemenu.find('.menu-fixed__item');

    const mobilDetect = new MobileDetect(window.navigator.userAgent);
    const isMobile = mobilDetect.mobile();

    let inScroll = false;

    sections.first().addClass('active-ops');

    const countSectionPosition = sectionEq => {
        const position = sectionEq * -100;

        if (isNaN(position)) {
            return 0;
        }

        return position;
    }

    const changeMenuThemeForSection = sectionEq => {
        const currentSection = sections.eq(sectionEq);
        const menuTheme = currentSection.attr('data-sidemenu-theme');
        const activeClass = 'menu-fixed--shadowed';

        if (menuTheme === 'black') {
            sidemenu.addClass(activeClass);
        } else {
            sidemenu.removeClass(activeClass);
        }
    };

    const resetActiveClassForItem = (items, itemEq, activeClass) => {
        items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
    }

    const performTransition = sectionEq => {

        if (inScroll) return

        const transitionOver = 1000;
        const mouseInertiaOver = 500;

        inScroll == true;
        const position = countSectionPosition(sectionEq);

        changeMenuThemeForSection(sectionEq);

        display.css({
            transform: `translateY(${position}%)`
        })

        resetActiveClassForItem(sections, sectionEq, 'active-ops');



        setTimeout(() => {
            inScroll == false;

            resetActiveClassForItem(menuItems, sectionEq, 'menu-fixed__item--active');

        }, transitionOver + mouseInertiaOver);

    }


    const viewportScroller = () => {
        const activeSection = sections.filter('.active-ops');
        const nextSection = activeSection.next();
        const prevSection = activeSection.prev();

        return {
            next() {
                if (nextSection.length) {
                    performTransition(nextSection.index())
                }
            },
            prev() {
                if (prevSection.length) {
                    performTransition(prevSection.index())
                }
            }
        }

    }


    $(window).on('wheel', e => {

        const deltaY = e.originalEvent.deltaY;
        const scroller = viewportScroller();

        if (deltaY > 0) {
            scroller.next();
        }

        if (deltaY < 0) {
            scroller.prev();
        }

    });

    $(window).on('keydown', e => {

        const tagName = e.target.tagName.toLowerCase();
        const userTypingInputs = tagName == 'input' || tagName == 'textarea';
        const scroller = viewportScroller();

        if (userTypingInputs) return;

        switch (e.keyCode) {
            case 38:   //prev
                scroller.prev();
                break;

            case 40:  //next
                scroller.next();
                break;
        }


    });

    $('.wrapper').on('touchmove', e => e.preventDefault());

    $('[ data-scroll-to]').click(e => {
        e.preventDefault();

        const $this = $(e.currentTarget);
        const target = $this.attr('data-scroll-to');
        const reqSection = $(`[ data-section-id=${target}]`);

        performTransition(reqSection.index());
    });

    if (isMobile) {
        $("body").swipe({
            swipe: function (
                event,
                direction,
            ) {

                // alert(direction)
                const scroller = viewportScroller();
                let scrollDirection = "";

                if (direction == 'up') scrollDirection = 'next';
                if (direction == 'down') scrollDirection = 'prev';

                scroller[scrollDirection]();
            },
        });
    }
})()
