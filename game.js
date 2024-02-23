let player
let platform = []

class Game {
    setup() {
        player = new Player(canvas.width / 2, canvas.height / 2)
        while (platform.length < 10)
            platform.push(new Platform())
    }
    update(time) {
        for (let i = 0; i < platform.length; i++) {
            const platform_width = platform[i].width
            const origin_x = canvas.width + platform_width
            const displace = -((platform[i].speed * time) % origin_x) + origin_x - platform_width / 2

            platform[i].set_position(displace, platform[i].y)

            const right_border = platform[i].x + platform_width
            if (right_border < 0) {
                platform[i].setup()
            }
        }
        player.update(time)
    }
}