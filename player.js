class Player extends GameObject {
    constructor(x, y) {
        const radius = canvas.height * 0.025
        const shape = circle(0, 0, radius, 30)
        super(
            x,
            y,
            shape,
            earcut(shape),
            matrix.translation(x, y)
        )
        this.radius = radius
        this.hook = new Hook(x, y - canvas.height / 5, this.radius / 4)
        this.angle = 0
        this.ang_acc = 0
        this.ang_vel = 0
        this.len = canvas.height / 5
        this.hung = true
        this.acc = { x: 0, y: 0 }
        this.vel = { x: 0, y: 0 }
        this.pos = { x: x, y: y }
        game_object.push(this)
    }
    update(delta) {
        if (this.hung) {
            this.ang_acc = -Math.cos(this.angle) * 0.00005 / this.len
            this.ang_vel += (this.ang_acc * delta)
            this.angle += (this.ang_vel * delta)

            this.transform = matrix.multiply(
                matrix.translation(this.hook.x, this.hook.y),
                matrix.rotation(this.angle))
            this.transform = matrix.multiply(
                this.transform,
                matrix.translation(this.len, 0))
        }
        else {
            this.acc.y = 0.001
            this.vel.x += this.acc.x
            this.vel.y += this.acc.y
            this.pos.x += this.vel.x
            this.pos.y += this.vel.y

            this.transform = matrix.translation(this.pos.x, this.pos.y)
        }
    }
}

class Hook extends GameObject {
    constructor(x, y, r) {
        const shape = circle(0, 0, r, 10)
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