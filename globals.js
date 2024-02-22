const canvas = document.createElement("canvas")
const button = document.createElement("button")
const gl = canvas.getContext("webgl2")
let programInfo
let bufferInfo
let state = -1
let lastTime
let counter = 0
