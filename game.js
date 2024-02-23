let player
let platform = []

class Game {
    setup() {
        player = new Player(canvas.width / 2, canvas.height / 2)
        while (platform.length < 7) {
            platform.push(new Platform())
            // platform[platform.length - 1].setup()
        }

    }
    update(delta) {
        for (let i = 0; i < platform.length; i++) {
            const platform_width = platform[i].width
            const origin_x = canvas.width + platform_width

            // if (!platform[i].stop)
            platform[i].update(delta)

            if (platform[i].x < -platform[i].width / 2) {
                platform[i].setup()
            }
        }
        player.update(delta)
    }
}