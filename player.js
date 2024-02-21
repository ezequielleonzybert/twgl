class Player {
    constructor() {
        this.vertices = circle(0, 0, 50, 30)
        this.indices = earcut(this.vertices)
        this.transform = matrix.identity();
    }
    update(time) {
        const translation1 = matrix.translation(canvas.width / 2, canvas.height / 2)
        const translation2 = matrix.translation(Math.sin(time * 0.001) * 100, 0)
        this.transform = matrix.multiply(translation1, translation2)
    }
}