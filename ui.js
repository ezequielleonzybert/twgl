class UI extends GameObject {
    constructor() {
        const pos = { x: canvas.width / 2, y: canvas.height / 2 }
        const width = canvas.width / 5
        const height = canvas.height / 5
        const vertices = rectangle(pos.x - width / 2, pos.y - height / 2, width, height)
        const indices = earcut(vertices)
        const transform = matrix.identity()
        const color = [1, 1, 1, 1]
        super(pos, vertices, indices, transform, color)
    }
}