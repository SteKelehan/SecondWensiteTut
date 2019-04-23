const app = () => {

    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");
    //Sounds
    const sounds = document.querySelectorAll(".sound-picker button");
    //Time Display
    const timeDisplay = document.querySelector(".time-display");
    const outlineLength = outline.getTotalLength();
    //Duration
    const timeSelect = document.querySelectorAll(".time-select button");
    let fakeDuration = 600;

    outline.style.strokeDashoffset = outlineLength;
    outline.style.strokeDasharray = outlineLength;

    play.addEventListener("click", () => {
        checkPlaying(song);
    });

    timeSelect.forEach(option => {
        option.addEventListener("click", () => {
            fakeDuration = option.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        })
    })

    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }

    };

    // animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let miuntes = Math.floor(elapsed / 60);

        // The bar updated

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.strokeDashoffset = progress;

        // The text update

        timeDisplay.textContent = `${miuntes}:${seconds}`;
        console.log(miuntes, seconds);
    }
}

app();