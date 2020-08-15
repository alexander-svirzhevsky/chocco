; (function () {
    window.onload = function () {
        // кнопки
        const playButton = document.getElementById("play");
        const playButtonn = document.getElementById("playy");
        const volumeBar = document.getElementById("volume-bar");
        const seekBar = document.getElementById("seek-bar");
        const muteButton = document.getElementById("mute");
        const splashPlayer = document.getElementById("splash");

        // Прослушиватель событий для кнопки воспроизведения / паузы
        playButton.addEventListener("click", function () {
            if (video.paused == true) {
                // Воспроизвести видео
                video.play();
                playButtonn.classList.add('paused');
                playButton.classList.add('active-play');
                splashPlayer.classList.add('splash_active');
            } else {
                // Приостановить видео
                video.pause();
                playButtonn.classList.remove('paused');
                playButton.classList.remove('active-play');
                // playButton.innerHTML = "";
            }
        });

        playButtonn.addEventListener("click", function () {
            if (video.paused == true) {
                video.play();
                playButtonn.classList.add('paused');
                playButton.classList.add('active-play');
                splashPlayer.classList.add('splash_active');
            } else {
                video.pause();
                playButtonn.classList.remove('paused');
                playButton.classList.remove('active-play');
            }
        });

        volumeBar.addEventListener("change", function () {
            // Обновляем громкость видео
            video.volume = volumeBar.value;
        });

        // Event listener for the seek bar
        seekBar.addEventListener("change", function () {
            // Calculate the new time
            var time = video.duration * (seekBar.value / 100);

            // Update the video time
            video.currentTime = time;
        });

        // Обновляем панель поиска при воспроизведении видео 
        video.addEventListener("timeupdate", function () {
            // Вычисляем значение ползунка 
            const value = (100 / video.duration) * video.currentTime;

            // Обновляем значение ползунка 
            seekBar.value = value;
        });

        // Приостановить видео при перетаскивании 
        seekBar.addEventListener("mousedown", function () {
            video.pause();
        });

        // Воспроизвести видео, когда дескриптор слайдера пропущен 
        seekBar.addEventListener("mouseup", function () {
            video.play();
        });


        // Event listener for the mute button
        muteButton.addEventListener("click", function () {
            if (video.muted == false) {
                // Mute the video
                video.muted = true;

                // Update the button text

            } else {
                // Unmute the video
                video.muted = false;

                // Update the button text

            }
        });

    }
})()



