class Joystick extends GameObject {
    constructor() {
        const pos = {}
        const radius = canvas.width / 15
        const vertices = circle(0, 0, radius, 40)
        const indices = earcut(vertices)
        const transform = matrix.identity()
        const color = [1, 1, 1, 0.05]
        super(
            pos,
            vertices,
            indices,
            transform,
            color
        )
        this.radius = radius
        this.stick = new Stick(radius * 0.4)
        this.angle = Math.PI / 2
    }
    update() {
        if (mousedown) {
            const distance = dist(this.pos.x, this.pos.y, this.stick.pos.x, this.stick.pos.y)
            this.angle = -Math.atan2(this.stick.pos.y - this.pos.y, this.stick.pos.x - this.pos.x)
            if (distance > this.radius) {
                this.pos.x += Math.cos(this.angle) * (distance - this.radius)
                this.pos.y -= Math.sin(this.angle) * (distance - this.radius)
            }
        }
        else {
            this.hide()
        }
        this.transform = matrix.translation(this.pos.x, this.pos.y)
        this.stick.update()
    }
    set_pos(x, y) {
        this.pos.x = x
        this.pos.y = y
        this.stick.pos.x = x
        this.stick.pos.y = y
    }
    hide() {
        this.pos.x = -9999
        this.pos.y = -9999
        this.stick.pos.x = -9999
        this.stick.pos.y = -9999
    }
}

class Stick extends GameObject {
    constructor(radius) {
        const pos = { x: 0, y: 0 }
        const vertices = circle(0, 0, radius, 30)
        const indices = earcut(vertices)
        const transform = matrix.identity()
        const color = [1, 1, 1, 0.05]
        super(
            pos,
            vertices,
            indices,
            transform,
            color
        )
        this.radius = radius
    }
    update() {
        this.transform = matrix.translation(this.pos.x, this.pos.y)
    }
    set_pos(x, y) {
        this.pos.x = x
        this.pos.y = y
    }
}