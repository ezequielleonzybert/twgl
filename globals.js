const canvas = document.createElement("canvas")
const button = document.createElement("button")
const gl = canvas.getContext("webgl2")
let programInfo
let bufferInfo = []
let transform = []
let state = -1
let lastTime
let counter = 0
let game_object = []
let portrait = false;
