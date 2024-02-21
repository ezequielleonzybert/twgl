function fullscreen(e) {
    if (e.requestFullscreen) {
        e.requestFullscreen();
    } else if (e.webkitRequestFullscreen) { /* Safari */
        e.webkitRequestFullscreen();
    } else if (e.msRequestFullscreen) { /* IE11 */
        e.msRequestFullscreen();
    } else if (e.mozRequestFullscreen) {
        e.mozRrquestFullscreen();
    }
}

button.addEventListener("click", () => {
    fullscreen(canvas)
})

canvas.addEventListener("fullscreenchange", () => {
    if (state == -1) {
        state = 1
        unpause_time = document.timeline.currentTime
        canvas.width = window.screen.width
        canvas.height = window.screen.height
        app()
    }
    else if (state == 1) {
        state = 0
        pause_time = document.timeline.currentTime
        canvas.width = 0
        canvas.height = 0
    }
    else if (state == 0) {
        state = 1
        unpause_time = document.timeline.currentTime
        canvas.width = window.screen.width
        canvas.height = window.screen.height
        render()
    }
})