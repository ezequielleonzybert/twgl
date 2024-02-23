class Platform extends GameObject {
    constructor() {
        const shape = rectangle(0, 0, canvas.width / 8, 30)
        const y = Math.random() * 250
        super(
            0,
            y,
            shape,
            earcut(shape),
            matrix.translation(0, y)
        )
        this.width = canvas.width / 8
        this.speed = Math.random() * 2 + 1
        game_object.push(this)
    }
    setup() {
        this.y = Math.random() * 250
        this.speed = Math.random() * 2 + 1
    }
    set_position(x, y) {
        this.x = x
        this.y = y
        this.transform = matrix.translation(x, y);
        // this.transofrm = matrix.multiply(translation, this.transform)
    }
}