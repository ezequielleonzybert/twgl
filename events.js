function fullscreen(e) {
    if (e.requestFullscreen) {
        e.requestFullscreen();
        // document.exitFullscreen();
    } else if (e.webkitRequestFullscreen) { /* Safari */
        e.webkitRequestFullscreen();
    } else if (e.msRequestFullscreen) { /* IE11 */
        e.msRequestFullscreen();
    } else if (e.mozRequestFullscreen) {
        e.mozRrquestFullscreen();
    }
}

button.addEventListener("click", () => {
    if (window.screen.width > window.screen.height) {
        canvas.width = window.screen.width
        canvas.height = window.screen.height
        fullscreen(container)
    }
    else {
        alert("Please change the device orientation to landscape to play")
    }
})

container.addEventListener("fullscreenchange", () => {
    if (state == -1) {
        state = 1
        canvas.style.display = "block"
        // overlay.style.display = "block"
        button.innerHTML = "Continue"
        game.setup()
        app()
    }
    else if (state == 1) {
        state = 0
        canvas.style.display = "none"
        // overlay.style.display = "none"
        lastTime = null
    }
    else if (state == 0) {
        state = 1
        canvas.style.display = "block"
        // overlay.style.display = "block"
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

screen.orientation.addEventListener("change", (e) => {
    if (state == 1 &&
        e.target.type == "portrait-primary" || e.target.type == "portrait_secondary") {
        alert("Please change the device orientation to landscape to play")
    }
})