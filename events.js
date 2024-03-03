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
canvas.addEventListener("mousemove", (e) => {
    if (mousedown) {
        joystick.stick.pos = { x: e.clientX, y: e.clientY }
    }
})

canvas.addEventListener("mousedown", (e) => {
    mousedown = true
    joystick.pos = { x: e.clientX, y: e.clientY }
    joystick.stick.pos = { x: e.clientX, y: e.clientY }

})

canvas.addEventListener("mouseup", (e) => {
    mousedown = false
})

document.addEventListener("keydown", (e) => {
    if (state == 1) {
        if (e.key == ' ') {
            if (player.hung) {
                player.release(delta)
            }
            else {
                player.hook.shoot()
            }
        }
    }
})

canvas.addEventListener("touchstart", (e) => {
    const touchlist = e.changedTouches
    for (let i = 0; i < touchlist.length; i++) {
        if (touchlist.item(i).clientX > canvas.width / 2) {
            player.release(delta)
        }
    }
})

// canvas.addEventListener("touchmove", (e) => {
//     const touchlist = e.changedTouches
//     for (let i = 0; i < touchlist.length; i++) {
//         if (touchlist.item(i).clientX > canvas.width / 2) {

//         }
//     }
// })