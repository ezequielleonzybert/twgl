class Platform {
    constructor() {
        this.vertices = rectangle(0, 0, 200, 50)
        this.indices = earcut(this.vertices)
        this.transform = matrix.identity();
        game_object.push(this)
    }
    update(time) {

    }
    set_position(x, y) {
        this.transform = matrix.translation(x, y);
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