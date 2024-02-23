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