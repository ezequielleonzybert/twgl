class Object {
    constructor() {
        this.vertices
        this.indices
        this.transform
    }
    static get_arrays() {
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
    }
    static get_uniforms() {
        const uniforms = {
            u_resolution: [gl.canvas.width, gl.canvas.height],
            u_transform: this.transform,
        }
        return uniforms
    }
}