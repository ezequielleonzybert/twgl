function setup_dom() {
    document.body.style.margin = 0
    document.body.style.padding = 0

    button.style.top = "50%"
    button.style.left = "50%"
    button.style.position = "absolute"
    button.innerText = "Start"
    button.style.width = "200px"
    button.style.height = "200px"
    button.style.transform = "translate(-50%, -50%)"
    document.body.appendChild(button)

    canvas.width = 0
    canvas.height = 0
    canvas.style.display = "block"
    canvas.style.position = "absolute"
    document.body.appendChild(canvas)
}

let game = new Game()

function app() {
    programInfo = twgl.createProgramInfo(gl, [vs, fs])

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
    bufferInfo = twgl.createBufferInfoFromArrays(gl, player_arrays)

    requestAnimationFrame(render);
}

function render(time) {
    if (state == 1) {
        if (lastTime != null) {
            const delta = time - lastTime

            twgl.resizeCanvasToDisplaySize(gl.canvas)
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
            gl.clearColor(0, 0, 0, 1)
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

            game.update(counter + delta * 0.001)
            const uniforms = {
                u_resolution: [gl.canvas.width, gl.canvas.height],
                u_transform: player.transform,
            }

            gl.useProgram(programInfo.program)
            twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
            twgl.setUniforms(programInfo, uniforms)
            twgl.drawBufferInfo(gl, bufferInfo)

            counter++
        }

        lastTime = time
        requestAnimationFrame(render)
    }
}

setup_dom()