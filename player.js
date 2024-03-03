class Player extends GameObject {
    constructor(x, y) {
        const radius = canvas.height * 0.025
        const shape = circle(0, 0, radius, 30)
        super(
            { x: x, y: y },
            shape,
            earcut(shape),
            matrix.translation(x, y),
            [0.9, 0.1, 0.1, 1]
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
    }

    update(delta) {
        if (this.hung) {
            this.ang_acc = -Math.cos(this.angle) * gravity / this.len
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
            this.pos.x = this.transform[6]
            this.pos.y = this.transform[7]
        }
        else {
            this.acc.y = gravity
            this.vel.x += this.acc.x * delta
            this.vel.y += this.acc.y * delta
            this.pos.x = this.vel.x * delta
            this.pos.y = this.vel.y * delta

            this.transform = matrix.multiply(
                matrix.translation(this.pos.x, this.pos.y),
                this.transform
            )
            player.pos.x = this.transform[6]
            player.pos.y = this.transform[7]

        }
        this.hook.update(delta)
    }

    release(delta) {
        this.hung = !this.hung
        this.hook.state = "returning"
        this.vel.x = -Math.sin(this.angle) * this.ang_vel * delta * 7
        this.vel.y = -Math.cos(this.angle) * this.ang_vel * delta * 7
    }
}

class Hook extends GameObject {
    constructor(x, y, r) {
        const shape = circle(0, 0, r, 10)
        super(
            { x: x, y: y },
            shape,
            earcut(shape),
            matrix.translation(x, y),
            [1, 0.5, 0.5, 1]
        )
        this.state = "hanging"
        this.counter = 0
        this.target
        this.origin
    }

    update(delta) {
        this.pos.x = this.transform[6]
        this.pos.y = this.transform[7]
        this.target = { x: Math.cos(joystick.angle) * 200, y: -Math.sin(joystick.angle) * 200 }
        if (this.state == "hanging") {
        }
        else if (this.state == "returning") {
            this.transform = matrix.translation(player.pos.x, player.pos.y)
        }
        else if (this.state == "shooting") {
            if (this.counter < 2) {
                if (this.counter < 1) {
                    const b = bezier([0, 0], [1, 0], [0, 1], [1, 1], this.counter)
                    this.transform = matrix.translation(
                        this.origin.x + this.target.x * b.y,
                        this.origin.y + this.target.y * b.y)
                }
                else {
                    const b = bezier([0, 1], [1, 1], [0, 0], [1, 0], this.counter - 1)
                    this.transform = matrix.translation(
                        player.pos.x + (this.origin.x - player.pos.x + this.target.x) * b.y,
                        player.pos.y + (this.origin.y - player.pos.y + this.target.y) * b.y)
                }
                this.counter += 0.005
            }
            else {
                this.state = "idle"
            }
        }
        else if (this.state == "idle") {
            this.transform = matrix.translation(player.pos.x, player.pos.y)
        }
    }
    shoot() {
        this.state = "shooting"
        this.counter = 0
        this.origin = { ...this.pos }
    }
}