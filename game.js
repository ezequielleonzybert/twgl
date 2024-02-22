let player
let platform

class Game {
    setup() {
        player = new Player(canvas.width / 2, canvas.height / 2)
        platform = new Platform()
    }
    update(time) {
        player.update(time)
        platform.set_position(time, 0)
    }
}