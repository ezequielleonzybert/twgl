class Platform extends Object {
    constructor() {
        super()
        this.vertices = rectangle(0, 0, 200, 50)
        this.indices = earcut(this.vertices)
        this.transform = matrix.identity();
        game_object.push(this)
    }
    update(time) {

    }
    set_position(x, y) {
        this.transform = matrix.translation(x, y);
    }

}