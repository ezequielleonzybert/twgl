const container = document.createElement("div")
const canvas = document.createElement("canvas")
const button = document.createElement("button")
const gl = canvas.getContext("webgl2")
const overlay = document.createElement("div")
// const style = getComputedStyle(document.documentElement);
// const notch_height = style.getPropertyValue("--notch_height");
let program_info
let buffer_info = []
let transform = []
let state = -1
let start
let then
let counter = 0
let game_object = []
let landscape
const frame_interval = 1000 / 60