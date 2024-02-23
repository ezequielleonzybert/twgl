class Player extends GameObject {
    constructor(x, y) {
        const shape = circle(0, 0, 30, 6)
        super(
            x,
            y,
            shape,
            earcut(shape),
            matrix.translation(x, y)
        )
        this.hook = new Hook(x, y - 100)
        this.angle = 0
        this.ang_acc = 0
        this.ang_vel = 0
        this.len = 300
        this.hung = true
        game_object.push(this)
    }
    update(delta) {
        if (this.hung) {
            this.ang_acc = -Math.cos(this.angle) * delta * 0.5 / this.len
            this.ang_vel += this.ang_acc
            this.angle += this.ang_vel

            this.transform = matrix.multiply(
                matrix.translation(this.hook.x, this.hook.y),
                matrix.rotation(this.angle))
            this.transform = matrix.multiply(
                this.transform,
                matrix.translation(this.len, 0))
        }

        // this.angle += this.ang_vel * delta
        // const rotation = matrix.rotation(this.angle)
        // const translation = matrix.translation(canvas.width / 2, canvas.height / 2)
        // const translation2 = matrix.translation(0, 100)
        // const m1 = matrix.multiply(translation, rotation)
        // this.transform = matrix.multiply(m1, translation2)
    }
}

class Hook extends GameObject {
    constructor(x, y) {
        const shape = circle(0, 0, 7, 6)
        super(
            x,
            y,
            shape,
            earcut(shape),
            matrix.translation(x, y)
        )
        game_object.push(this)
    }
}