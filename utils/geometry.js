function rectangle(x, y, w, h) {
    let vertices = [];

    vertices[0] = x - w / 2;
    vertices[1] = y - h / 2;
    vertices[2] = x + w / 2;
    vertices[3] = y - h / 2;
    vertices[4] = x + w / 2;
    vertices[5] = y + h / 2;
    vertices[6] = x - w / 2;
    vertices[7] = y + h / 2;

    return vertices;
}

function circle(x, y, r, segments) {
    let vertices = [];
    const angle_increment = (2 * Math.PI) / segments;

    for (let i = 0; i < segments; i++) {
        const ang = angle_increment * i;
        vertices.push(x + r * Math.cos(ang))
        vertices.push(y + r * Math.sin(ang))
    }
    return vertices;
}

function dist(x1, y1, x2, y2) {
    const dx = x2 - x1
    const dy = y2 - y1
    return Math.sqrt(dx * dx + dy * dy)
}