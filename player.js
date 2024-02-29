class Player extends GameObject {
    constructor(x, y) {
        const radius = canvas.height * 0.025
        const shape = circle(0, 0, radius, 30)
        super(
            { x: x, y: y },
            shape,
            earcut(shape),
            matrix.translation(x, y)
        )
        this.radius = radius
        this.hook = new Hook(x, y - 100, this.radius / 4)
        this.angle = 0
        this.ang_acc = 0
        this.ang_vel = 0
        this.len = dist(x, y, this.hook.pos.x, this.hook.pos.y)
        this.hung = true
        this.acc = { x: 0, y: 0 }
        this.vel = { x: 0, y: 0 }
        game_object.push(this)
    }

    update(delta) {
        if (this.hung) {
            this.ang_acc = -Math.cos(this.angle) * 0.00005 / this.len
            this.ang_vel += (this.ang_acc * delta)
            this.angle += (this.ang_vel * delta)
            // rotation pivot position
            this.transform = matrix.multiply(
                matrix.translation(this.hook.pos.x, this.hook.pos.y),
                matrix.rotation(this.angle))
            // bob position
            this.transform = matrix.multiply(
                this.transform,
                matrix.translation(this.len, 0))
            // update positions
            this.pos.x = this.transform[2]
            this.pos.y = this.transform[5]
        }
        else {
            this.acc.y = 0.000025
            this.vel.x += this.acc.x * delta
            this.vel.y += this.acc.y * delta
            this.pos.x = this.vel.x * delta
            this.pos.y = this.vel.y * delta

            this.transform = matrix.multiply(
                matrix.translation(this.pos.x, this.pos.y),
                this.transform
            )
        }
    }

    release(delta) {
        this.hung = !this.hung
        this.vel.x = -Math.sin(this.angle) * this.ang_vel * delta * 7
        this.vel.y = -Math.cos(this.angle) * this.ang_vel * delta * 7
        this.hook.pos = this.pos
    }
}

class Hook extends GameObject {
    constructor(x, y, r) {
        const shape = circle(0, 0, r, 10)
        super(
            { x: x, y: y },
            shape,
            earcut(shape),
            matrix.translation(x, y)
        )
        game_object.push(this)
    }

    update(delta) {
    }
}