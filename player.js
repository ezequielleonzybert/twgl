class Player extends GameObject {
    constructor(x, y) {
        const shape = circle(0, 0, 30, 30)
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
        this.acc = { x: 0, y: 0 }
        this.vel = { x: 0, y: 0 }
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
        else {

        }
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