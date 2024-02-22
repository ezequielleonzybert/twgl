let player
let platform

class Game {
    setup() {
        player = new Player(canvas.width / 2, canvas.height / 2)
        platform = new Platform(0, 0)
    }
    update(time) {
        platform.set_position(time, 0)
        player.update(time)
    }
}