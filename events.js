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

window.addEventListener("deviceorientation", (e) => {

})

button.addEventListener("click", () => {
    if (window.screen.width > window.screen.height) {
        screen_width = window.screen.width
        screen_height = window.screen.height
        fullscreen(canvas)
    }
    else {
        alert("Please change the device orientation to landscape to play")
    }
})

canvas.addEventListener("fullscreenchange", () => {
    if (state == -1) {
        state = 1
        canvas.style.display = "block"
        button.innerHTML = "Continue"
        game.setup()
        app()
    }
    else if (state == 1) {
        state = 0
        canvas.style.display = "none"
        lastTime = null
    }
    else if (state == 0) {
        state = 1
        canvas.style.display = "block"
        render()
    }
})

document.addEventListener("keydown", (e) => {
    if (state == 1) {
        if (player.hung)
            if (e.key == ' ') {
                player.hung = false
            }
    }
})