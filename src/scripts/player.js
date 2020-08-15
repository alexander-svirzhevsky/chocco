; (function () {
    let player;
    const playerContainer = $('.player');

    let eventInit = () => {
        $('.player__start').click(e => {
            e.preventDefault();

            if (playerContainer.hasClass('paused')) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }

        })


        $('.player__playback').click(e => {
            const bar = $(e.currentTarget);
            const clickPosition = e.originalEvent.layerX;
            const newbuttonPosition = (clickPosition / bar.width()) * 100;
            const newPlaybackPositionSec = (player.getDuration() / 100) * newbuttonPosition;

            $('.player__playback-botton').css({
                left: `${newbuttonPosition}%`
            });

            player.seekTo(newPlaybackPositionSec)
        });

        $('.player__splash').click(e => {
            e.preventDefault();
            player.playVideo();
        })

    };

    const formatTime = timeSec => {
        const roundTime = Math.round(timeSec);

        const munutes = addZero(Math.floor(roundTime / 60));
        const seconds = addZero(roundTime - munutes * 60);

        function addZero(num) {
            return num < 10 ? `0${num}` : num;
        }

        return `${munutes} : ${seconds}`;
    }

    const onPlayerReady = () => {
        let interval;
        const durationSec = player.getDuration();

        $('.player__duration-est').text(formatTime(durationSec));

        if (typeof interval != 'undefined') {
            clearInterval(interval);
        }

        interval = setInterval(() => {
            const comletedSec = player.getCurrentTime();
            const completedPercent = (comletedSec / durationSec) * 100;

            $('.player__playback-botton').css({
                left: `${completedPercent}%`


            })
            $('.player__duration-compl').text(formatTime(comletedSec));
        }, 1000);
    };


    const onPlayerStateChange = event => {
        switch (event.data) {
            case 1:
                playerContainer.addClass('player-active');
                playerContainer.addClass('paused');
                break;

            case 2:
                playerContainer.removeClass('player-active');
                playerContainer.removeClass('paused');
                break;
        };
    };

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('yt-player', {
            height: '405',
            width: '660',
            videoId: 'vU09wQerc54',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            },
            playerVars: {
                controls: 0,
                disablekb: 0,
                showinfo: 0,
                rel: 0,
                autoplay: 0,
                modestbranding: 0,
            }
        });
    }

    eventInit();
})()

