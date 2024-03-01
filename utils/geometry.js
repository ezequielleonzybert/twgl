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

function bezier(p0, p1, p2, p3, t) {
    let p = []
    p[0] = Math.pow(1 - t, 3) * p0[0] +
        Math.pow(1 - t, 2) * 3 * t * p1[0] +
        (1 - t) * 3 * t * t * p2[0] +
        t * t * t * p3[0];
    p[1] = Math.pow(1 - t, 3) * p0[1] +
        Math.pow(1 - t, 2) * 3 * t * p1[1] +
        (1 - t) * 3 * t * t * p2[1] +
        t * t * t * p3[1];
    return { x: p[0], y: p[1] };
}