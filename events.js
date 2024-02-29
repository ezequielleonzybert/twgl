//All the input events

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
    if (window.screen.width > window.screen.height) {
        fullscreen(container)

    }
    else {
        alert("Please change the device orientation to landscape in order to play")
    }
})
screen.orientation.addEventListener("change", (e) => {
    if (state == 1 &&
        e.target.type == "portrait-primary" || e.target.type == "portrait_secondary") {
        alert("Please change the device orientation to landscape in order to play")
    }
})

container.addEventListener("fullscreenchange", () => {
    if (state == -1) {
        state = 1
        canvas.style.display = "block"
        overlay.style.display = "block"
        button.innerHTML = "Continue"
        setTimeout(() => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
            game.setup()
            app()
        }, 10)
    }
    else if (state == 1) {
        state = 0
        then = undefined
        canvas.style.display = "none"
        overlay.style.display = "none"
        lastTime = null
    }
    else if (state == 0) {
        state = 1
        canvas.style.display = "block"
        overlay.style.display = "block"
        render()
    }
})

// window.addEventListener("blur", (e) => {
//     if (state == 1)
//         document.exitFullscreen()
// })

document.addEventListener("keydown", (e) => {
    if (state == 1) {
        if (player.hung)
            if (e.key == ' ') {
                player.hung = false
            }
    }
})

canvas.addEventListener("touchstart", (e) => {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    if (x > canvas.width / 2) {
        player.hung = !player.hung
    }
})