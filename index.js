let player = new Player()

let canvas = document.createElement("canvas");
document.body.appendChild(canvas);
let gl = canvas.getContext("webgl2");

const programInfo = twgl.createProgramInfo(gl, [vs, fs]);

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
const bufferInfo = twgl.createBufferInfoFromArrays(gl, player_arrays);

function render(time) {
    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    time *= 0.001
    player.update(time)

    const uniforms = {
        u_resolution: [gl.canvas.width, gl.canvas.height],
        u_transform: player.transform,
    };

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, bufferInfo);

    requestAnimationFrame(render);
}
requestAnimationFrame(render);
