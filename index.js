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

    if (screen_width < screen_height) {
        portrait = true
        canvas.style.rotate = "90deg"
        canvas.width = screen_height
        canvas.height = screen_width
    }
    else {
        canvas.width = screen_width
        canvas.height = screen_height
    }
    canvas.style.display = "none"
    canvas.style.position = "absolute"
    document.body.appendChild(canvas)
}

let game = new Game()

function app() {
    programInfo = twgl.createProgramInfo(gl, [vs, fs])

    game_object.forEach((e) => {
        const arrays = e.get_arrays();
        bufferInfo.push(twgl.createBufferInfoFromArrays(gl, arrays))
    })

    requestAnimationFrame(render);
}

function render(time) {
    if (state == 1) {
        if (lastTime != null) {
            const delta = (time - lastTime) * 0.001

            twgl.resizeCanvasToDisplaySize(gl.canvas);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
            gl.clearColor(0.5, 0.5, 0.5, 1)
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

            for (let i = 0; i < bufferInfo.length; i++) {
                const uniforms = {
                    u_resolution: [gl.canvas.width, gl.canvas.height],
                    u_transform: game_object[i].transform,
                }

                gl.useProgram(programInfo.program)
                twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo[i])
                twgl.setUniforms(programInfo, uniforms)
                twgl.drawBufferInfo(gl, bufferInfo[i])

                game.update(delta)
            }
            counter++
        }

        lastTime = time
        requestAnimationFrame(render)
    }
}

setup_dom()