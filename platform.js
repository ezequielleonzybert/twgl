class Platform extends GameObject {
    constructor() {
        const width = canvas.width / 8
        const x = canvas.width + width / 2
        const y = Math.random() * 250 + 15
        const shape = rectangle(0, 0, width, 30)
        super(
            x,
            y,
            shape,
            earcut(shape),
            matrix.translation(x, y)
        )
        this.width = width
        this.speed = { "x": (Math.random() + 1) * 5, "y": 0 }
        this.stop = true
        game_object.push(this)
    }
    setup() {
        this.x = canvas.width + this.width / 2
        this.y = Math.random() * 250 + 15
        this.speed = { "x": (Math.random() + 1) * 5, "y": 0 }
    }
    update(delta) {
        this.x -= this.speed.x * delta
        this.y += this.speed.y * delta
        this.transform = matrix.translation(this.x, this.y)
    }
    is_on_screen() {
        if (this.x < canvas.width + this.width / 2 &&
            this.x > -this.width / 2)
            return true
        else {
            return false
        }
    }
}