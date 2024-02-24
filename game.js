let player
let platform = []

class Game {
    setup() {
        player = new Player(canvas.width / 2, canvas.height / 2)
        while (platform.length < 7) {
            platform.push(new Platform())
        }
        window.setTimeout(() => { platform[0].stop = false }, 1000)
    }
    update(delta) {
        for (let i = 0; i < platform.length; i++) {
            const platform_width = platform[i].width

            let running_platforms = 0
            for (let j = 0; j < platform.length; j++) {
                if (!platform[j].stop) {
                    running_platforms++
                }
            }

            const prev_platform = platform[Math.max(running_platforms - 1, 0)]
            if (
                running_platforms < platform.length &&
                prev_platform.x < canvas.width - prev_platform.width / 2) {
                platform[i].stop = false
            }

            if (!platform[i].stop)
                platform[i].update(delta)

            if (platform[i].x < -platform[i].width / 2) {
                platform[i].setup()
            }
        }
        player.update(delta)
    }
}