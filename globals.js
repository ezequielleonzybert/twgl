const screen_width = window.screen.width
const screen_height = window.screen.height
const canvas = document.createElement("canvas")
const button = document.createElement("button")
const gl = canvas.getContext("webgl2")
let vs
let program_info
let buffer_info = []
let transform = []
let state = -1
let lastTime
let counter = 0
let game_object = []
let portrait = false
const portrait_matrix = matrix.identity()
// matrix.multiply(
//     matrix.translation(screen_width, 0),
//     matrix.rotation(-Math.PI / 2))
let log