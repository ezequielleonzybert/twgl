let screen_width = window.screen.width
let screen_height = window.screen.height
const canvas = document.createElement("canvas")
const button = document.createElement("button")
const gl = canvas.getContext("webgl2")
let program_info
let buffer_info = []
let transform = []
let state = -1
let lastTime
let counter = 0
let game_object = []
let landscape