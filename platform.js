class Platform extends GameObject {
    constructor(x, y) {
        const shape = rectangle(0, 0, 200, 50)
        super(
            x,
            y,
            shape,
            earcut(shape),
            matrix.translation(x, y)
        )
        game_object.push(this)
    }
    update(time) {

    }
    set_position(x, y) {
        super.transform = matrix.translation(x, y);
    }
}