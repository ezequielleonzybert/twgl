const canvas = document.createElement("canvas")
const button = document.createElement("button")
const gl = canvas.getContext("webgl2")
let programInfo
let bufferInfo
let state = -1
let timer = 0;
let pause_time = 0
let unpause_time = 0
