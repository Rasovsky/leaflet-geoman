L.PM.Draw = L.Class.extend({
    options: {
        templineStyle: {
            color: 'red',
        },
        hintlineStyle: {
            color: 'red',
            dashArray: [5, 5],
        },
    },
    initialize(map) {
        // save the map
        this._map = map;

        // define all possible shapes that can be drawn
        this.shapes = ['Poly', 'Line', 'Marker'];

        // initiate drawing class for our shapes
        this.shapes.forEach((shape) => {
            this[shape] = new L.PM.Draw[shape](this._map);
        });
    },
    getShapes() {
        // if somebody wants to know what shapes are available
        return this.shapes;
    },
    enable(shape, options) {
        if(!shape) {
            throw new Error(`Error: Please pass a shape as a parameter. Possible shapes are: ${this.getShapes().join(',')}`);
        }

        // disable drawing for all shapes
        this.disable();

        // enable draw for a shape
        this[shape].enable(options);
    },
    disable() {
        // there can only be one drawing mode active at a time on a map
        // so it doesn't matter which one should be disabled.
        // just disable all of them
        this.shapes.forEach((shape) => {
            this[shape].disable();
        });
    },
    addControls() {
        // add control buttons for our shapes
        this.shapes.forEach((shape) => {
            this[shape].addButton();
        });
    },
});
