class GameObject {
    constructor(pos, vertices, indices, transform, color) {
        this.pos = pos
        this.vertices = vertices
        this.indices = indices
        this.transform = transform
        this.color = color
    }
    get_arrays() {
        let arrays = {
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
            u_color: this.color,
        }
        return uniforms
    }
}