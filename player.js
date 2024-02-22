class Player {
    constructor() {
        this.vertices = circle(0, 0, 50, 8)
        this.indices = earcut(this.vertices)
        this.transform = matrix.identity();
        game_object.push(this)
    }
    update(time) {
        const translation1 = matrix.translation(canvas.width / 2, canvas.height / 2)
        const translation2 = matrix.translation(Math.sin(time * 0.01) * 200, Math.cos(time * 0.01) * 200)
        this.transform = matrix.multiply(translation1, translation2)
    }
    get_arrays() {
        const arrays = {
            a_position: {
                numComponents: 2,
                data: this.vertices,
            },
            indices: {
                numComponents: 2,
                data: this.indices,
            },
        }
        return arrays
    }
    get_uniforms() {
        const uniforms = {
            u_resolution: [gl.canvas.width, gl.canvas.height],
            u_transform: this.transform,
        }
        return uniforms
    }
}