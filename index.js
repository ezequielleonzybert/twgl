function setup_dom() {
    document.body.style.margin = 0
    document.body.style.padding = 0

    document.body.appendChild(container)

    button.style.top = "50%"
    button.style.left = "50%"
    button.style.position = "absolute"
    button.innerText = "Start"
    button.style.width = `${window.devicePixelRatio * 150}px`
    button.style.height = `${window.devicePixelRatio * 50}px`
    button.style.transform = "translate(-50%, -50%)"
    button.style.fontFamily = "monospace"
    button.style.fontSize = `${window.devicePixelRatio * 20}px`
    document.body.appendChild(button)

    canvas.width = window.screen.width
    canvas.height = window.screen.height
    canvas.style.display = "none"
    canvas.style.position = "absolute"
    container.appendChild(canvas)

    overlay.style.display = "block"
    overlay.style.position = "absolute"
    overlay.style.padding = "10px"
    overlay.style.fontFamily = "monospace"
    overlay.innerHTML = overlay_text
    container.appendChild(overlay)
}

let game = new Game()

function app() {
    program_info = twgl.createProgramInfo(gl, [vs, fs])

    game_object.forEach((e) => {
        const arrays = e.get_arrays()
        buffer_info.push(twgl.createBufferInfoFromArrays(gl, arrays))
    })

    requestAnimationFrame(render);
}

function render(time) {
    if (state == 1) {
        if (lastTime != null) {
            const delta = (time - lastTime) * 0.001

            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
            gl.clearColor(0.5, 0.5, 0.5, 1)
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

            for (let i = 0; i < buffer_info.length; i++) {
                const uniforms = {
                    u_resolution: [gl.canvas.width, gl.canvas.height],
                    u_transform: game_object[i].transform,
                }

                gl.useProgram(program_info.program)
                twgl.setBuffersAndAttributes(gl, program_info, buffer_info[i])
                twgl.setUniforms(program_info, uniforms)
                twgl.drawBufferInfo(gl, buffer_info[i])

                game.update(delta)
            }
        }

        counter++
        if (!counter || counter % 10 == 0)
            overlay.innerHTML =
                "fps: " + Math.round(1 / ((time - lastTime) / 1000)) + "<br>" +
                "pendulum velocity: " + Math.round(player.ang_vel * 100)

        lastTime = time
        requestAnimationFrame(render)
    }
}

setup_dom()