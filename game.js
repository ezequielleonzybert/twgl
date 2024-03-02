// Game abstraction

let player
let platform = []
let joystick

class Game {
    setup() {
        joystick = new Joystick()
        player = new Player(canvas.width / 2, canvas.height / 2)
        while (platform.length < 7) {
            platform.push(new Platform())
        }
        window.setTimeout(() => { platform[0].stop = false }, 1000)
    }
    update(delta) {
        for (let i = 0; i < platform.length; i++) {
            let running_platforms = 0
            for (let j = 0; j < platform.length; j++) {
                if (!platform[j].stop) {
                    running_platforms++
                }
            }

            const prev_platform = platform[Math.max(running_platforms - 1, 0)]
            if (
                running_platforms < platform.length &&
                prev_platform.pos.x < canvas.width - prev_platform.width / 2) {
                platform[i].stop = false
            }

            if (!platform[i].stop)
                platform[i].update(delta)

            if (platform[i].pos.x < -platform[i].width / 2) {
                platform[i].setup()
            }
        }
        player.update(delta)
        joystick.update()
    }
}