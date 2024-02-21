function setup_dom() {
    document.body.style.margin = 0
    document.body.style.padding = 0
    canvas = document.createElement("canvas")
    canvas.width = window.screen.width
    canvas.height = window.screen.height
    canvas.style.display = "block";
    document.body.appendChild(canvas)
}

let game = new Game()

function app() {
    let gl = canvas.getContext("webgl2")
    const programInfo = twgl.createProgramInfo(gl, [vs, fs])

    const player_arrays = {
        a_position: {
            numComponents: 2,
            data: player.vertices,
        },
        indices: {
            numComponents: 2,
            data: player.indices,
        },
    };
    const bufferInfo = twgl.createBufferInfoFromArrays(gl, player_arrays)

    function render(time) {
        // twgl.resizeCanvasToDisplaySize(gl.canvas)
        // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        gl.clearColor(0, 0, 0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        time *= 0.001
        game.update(time)

        const uniforms = {
            u_resolution: [gl.canvas.width, gl.canvas.height],
            u_transform: player.transform,
        }

        gl.useProgram(programInfo.program)
        twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
        twgl.setUniforms(programInfo, uniforms)
        twgl.drawBufferInfo(gl, bufferInfo)

        requestAnimationFrame(render)
    }
    requestAnimationFrame(render);
}

setup_dom()
app()