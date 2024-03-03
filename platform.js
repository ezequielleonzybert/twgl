class Platform extends GameObject {
    constructor() {
        const width = canvas.width * 0.125
        const height = canvas.height * 0.02
        const x = canvas.width + width * 0.5
        const y = Math.random() * canvas.height * 0.4 + height
        const shape = rectangle(0, 0, width, height)
        super(
            { x: x, y: y },
            shape,
            earcut(shape),
            matrix.translation(x, y),
            [0.3, 0.3, 0.7, 1]
        )
        this.width = width
        this.height = height
        this.speed_factor = 0.005
        this.speed = { x: (Math.random() + 1) * this.speed_factor, y: 0 }
        this.stop = true
    }
    setup() {
        this.pos.x = canvas.width + this.width / 2
        this.pos.y = Math.random() * canvas.height * 0.4 + this.height
        this.speed.x = (Math.random() + 1) * this.speed_factor
    }
    update(delta) {
        this.pos.x -= this.speed.x * delta
        this.pos.y += this.speed.y * delta
        this.transform = matrix.translation(this.pos.x, this.pos.y)
    }
    is_on_screen() {
        if (this.pos.x < canvas.width + this.width / 2 &&
            this.pos.x > -this.width / 2)
            return true
        else {
            return false
        }
    }
}