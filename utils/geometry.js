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

function point_in_line(px, py, x1, y1, x2, y2) {
    let slope = (y2 - y1) / (x2 - x1)
    let intercept = y1 - slope * x1
    return py === (slope * px + intercept);
}

function Signed2DTriArea(a, b, c) {
    // Returns 2 times the signed triangle area. The result is positive if
    // abc is ccw, negative if abc is cw, zero if abc is degenerate.
    return (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);
}

function line_line_intersection(x0, y0, x1, y1, x2, y2, x3, y3) {
    const a = { x: x0, y: y0 }
    const b = { x: x1, y: y1 }
    const c = { x: x2, y: y2 }
    const d = { x: x3, y: y3 }
    // Test if segments ab and cd overlap. If they do, compute and return
    // interpolation value along ab and intersectionPoint

    // Sign of areas correspond to which side of ab points c and d are
    let a1 = Signed2DTriArea(a, b, d); // Compute winding of abd (+ or -)
    let a2 = Signed2DTriArea(a, b, c); // To intersect, must have sign opposite of a1
    // If c and d are on different sides of ab, areas have different signs
    if (a1 * a2 <= 0) {
        // Compute signs for a and b with respect to segment cd
        let a3 = Signed2DTriArea(c, d, a); // Compute winding of cda (+ or -)
        // Since area is constant a1 - a2 = a3 - a4, or a4 = a3 + a2 - a1
        // float a4 = Signed2DTriArea(c, d, b); // Must have opposite sign of a3
        let a4 = a3 + a2 - a1;
        // Points a and b on different sides of cd if areas have different signs
        if (a3 * a4 <= 0) {
            // Segments intersect. Find intersection point along L(t) = a + t * (b - a).
            // Given height h1 of an over cd and height h2 of b over cd,
            // t = h1 / (h1 - h2) = (b*h1/2) / (b*h1/2 - b*h2/2) = a3 / (a3 - a4),
            // where b (the base of the triangles cda and cdb, i.e., the length
            // of cd) cancels out.
            return true
            // 	let interpolation = a3 / (a3 - a4);
            // intersectionPoints.push_back(a + interpolation * (b - a));
            // return true;
        }
    }
    return false;
}

// function line_line_intersection(x0, y0, x1, y1, x2, y2, x3, y3) {
//     var dx1 = x1 - x0;
//     var dy1 = y1 - y0;
//     var dx2 = x3 - x2;
//     var dy2 = y3 - y2;
//     var determinant = dx1 * dy2 - dy1 * dx2;
//     if (determinant === 0) {
//         return false;
//     }
//     // Calculate intersection point
//     var t1 = ((x0 - x2) * dy2 - (y0 - y2) * dx2) / determinant;
//     var t2 = ((x0 - x2) * dy1 - (y0 - y2) * dx1) / determinant;
//     // Check if intersection point is within line segments
//     if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
//         return true
//         // var intersectionX = x0 + t1 * dx1;
//         // var intersectionY = y0 + t1 * dy1;
//         // return { x: intersectionX, y: intersectionY };
//     } else {
//         return false;
//     }
// }

function point_in_polygon(px, py, poly_vertices) {
    let intersections = 0
    poly_vertices.forEach((e, i, a) => {
        const x1 = e
        const y1 = a[(i + 1) % poly_vertices.length]
        const x2 = a[(i + 2) % poly_vertices.length]
        const y2 = a[(i + 3) % poly_vertices.length]
        const line = [x1, y1, x2, y2]
        if (line_line_intersection(px, py, px + 10000, py, x1, y1, x2, y2)) {
            intersections++
        }
    })
    return intersections % 2 != 0
}

