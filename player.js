class Player {
    constructor() {
        this.vertices = circle(0, 0, 50, 8)
        this.indices = earcut(this.vertices)
        this.transform = matrix.identity();
    }
    update(time) {
        const translation1 = matrix.translation(canvas.width / 2, canvas.height / 2)
        const translation2 = matrix.translation(Math.sin(time * 0.01) * 200, Math.cos(time * 0.01) * 200)
        this.transform = matrix.multiply(rotation, translation1)
        this.transform = matrix.multiply(this.transform, translation2)
    }
}