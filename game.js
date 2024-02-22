const player = new Player()
const platform = new Platform()

class Game {
    update(time) {
        player.update(time)
        platform.set_position(time, 0)
    }
}