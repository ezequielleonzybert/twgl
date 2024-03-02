class Joystick extends GameObject {
    constructor() {
        const pos = {}
        const radius = canvas.width / 15
        const shape = circle(0, 0, radius, 40)
        const indices = earcut(shape)
        const transform = matrix.identity()
        const color = [1, 1, 1, 0.05]
        super(
            pos,
            shape,
            indices,
            transform,
            color
        )
        this.radius = radius
        this.stick = new Stick(radius * 0.4)
    }
    update() {
        if (mousedown) {
            const distance = dist(this.pos.x, this.pos.y, this.stick.pos.x, this.stick.pos.y)
            const angle = -Math.atan2(this.stick.pos.y - this.pos.y, this.stick.pos.x - this.pos.x)
            if (distance > this.radius) {
                this.pos.x += Math.cos(angle) * (distance - this.radius)
                this.pos.y -= Math.sin(angle) * (distance - this.radius)
            }
            this.transform = matrix.translation(this.pos.x, this.pos.y)
            this.stick.update()
        }
        else {
            this.hide()
        }
    }
    show(pos) {
        this.transform = matrix.translation(pos.x, pos.y)
    }
    hide() {

    }
}

class Stick extends GameObject {
    constructor(radius) {
        const pos = { x: 0, y: 0 }
        const shape = circle(0, 0, radius, 20)
        const indices = earcut(shape)
        const transform = matrix.identity()
        const color = [1, 1, 1, 0.05]
        super(
            pos,
            shape,
            indices,
            transform,
            color
        )
        this.radius = radius
    }
    update() {
        this.transform = matrix.translation(this.pos.x, this.pos.y)
    }
}