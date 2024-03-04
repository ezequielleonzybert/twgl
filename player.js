class Player extends GameObject {
    constructor(x, y) {
        const radius = canvas.height * 0.025
        const vertices = circle(0, 0, radius, 30)
        super(
            { x: x, y: y },
            vertices,
            earcut(vertices),
            matrix.translation(x, y),
            [0.9, 0.1, 0.1, 1]
        )
        this.pos = { x: x, y: y }
        this.radius = radius
        this.hook = new Hook(x, y, this.radius / 4)
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
            this.ang_acc = -Math.cos(this.angle) * gravity / this.hook.len
            this.ang_vel += (this.ang_acc * delta)
            this.angle += (this.ang_vel * delta)
            // rotation pivot position
            this.transform = matrix.multiply(
                matrix.translation(this.hook.pos.x, this.hook.pos.y),
                matrix.rotation(this.angle))
            // bob position
            this.transform = matrix.multiply(
                this.transform,
                matrix.translation(this.hook.len, 0))
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
        this.vel.x = -Math.sin(this.angle) * this.ang_vel * delta * 3
        this.vel.y = -Math.cos(this.angle) * this.ang_vel * delta * 3
    }
}

class Hook extends GameObject {
    constructor(x, y, r) {
        const vertices = circle(0, 0, r, 15)
        super(
            { x: x, y: y - 100 },
            vertices,
            earcut(vertices),
            matrix.translation(x, y),
            [1, 0.5, 0.5, 1]
        )
        this.pos = { x: x, y: y - 100 }
        this.state = "floating"
        this.counter = 0
        this.target
        this.origin = { x: x, y: y }
        this.speed = 0.003
        this.power = canvas.height / 3
        this.platform_i = undefined
        this.len = dist(x, y - 100, this.origin.x, this.origin.y)
    }

    update(delta) {
        this.pos.x = this.transform[6]
        this.pos.y = this.transform[7]
        this.target = {
            x: Math.cos(joystick.angle) * this.power,
            y: -Math.sin(joystick.angle) * this.power
        }
        if (this.state == "floating") {
        }
        if (this.state == "hanging") {
            this.pos.x -= platform[this.platform_i].speed.x * delta
            this.transform = matrix.translation(this.pos.x, this.pos.y)
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
                this.pos.x = this.transform[6]
                this.pos.y = this.transform[7]
                this.counter += this.speed
                if (this.colliding()) {
                    this.state = "hanging"
                    player.angle = -Math.atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x)
                    this.len = dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y)
                    player.hung = true
                }
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
    colliding() {
        let platform_vertices

        for (let i = 0; i < platform.length; i++) {
            platform_vertices = []
            for (let j = 0; j < platform[i].vertices.length; j += 2) {
                platform_vertices.push(platform[i].vertices[j] + platform[i].transform[6])
                platform_vertices.push(platform[i].vertices[j + 1] + platform[i].transform[7])
            }
            if (point_in_polygon(this.pos.x, this.pos.y, platform_vertices)) {
                this.platform_i = i
                return true
            }
        }
        return false
    }
}