class Player extends Object {
    constructor(x, y) {
        super()
        this.x = x
        this.y = y
        this.vertices = circle(0, 0, 30, 8)
        this.indices = earcut(this.vertices)
        this.transform = matrix.translation(x, y)
        this.pivot_transform = matrix.identity()
        this.hook = new Hook(x, y)
        game_object.push(this)
    }
    update(time) {
        this.hook.transform = matrix.translation(this.x, this.y - 100)
        let rotation = matrix.rotation(-0.001)
        this.transform = matrix.multiply(rotation, this.transform)
    }
}

class Hook {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.transform = matrix.translation(x, y)
        this.vertices = circle(0, 0, 7, 8)
        this.indices = earcut(this.vertices)
        game_object.push(this)
    }
}