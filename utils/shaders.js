const vs_landscape = `#version 300 es
in vec2 a_position;
uniform vec2 u_resolution;
uniform mat3 u_transform;
uniform mat3 u_portrait_matrix;
void main() {
  vec2 position = (u_transform * vec3(a_position, 1)).xy;
  vec2 zeroToOne = position / u_resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  gl_Position = vec4(clipSpace * vec2(1,-1), 0, 1);
}`

const vs_portrait = `#version 300 es
in vec2 a_position;
in mat3 a_portrait_matrix;
uniform vec2 u_resolution;
uniform mat3 u_transform;
uniform mat3 u_portrait_translation;
uniform mat3 u_portrait_rotation;
void main() {
  vec2 position = (u_transform * vec3(a_position, 1)).xy;
  position = (u_portrait_translation * vec3(position,1) * u_portrait_rotation).xy;
  vec2 zeroToOne = position / u_resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}`

const fs = `#version 300 es
precision lowp float;
out vec4 outColor;
void main() {
  outColor = vec4(1, 0, 0.5, 1);
}`