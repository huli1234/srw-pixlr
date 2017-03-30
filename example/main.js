let pixlerInstance = SrwPixelDrawer.create({
    selector: '.canv-element',
    resolution : {
        x : 21,
        y : 21
    },
    width: 315,
    height: 315,
    speed : 30,
    backgroundColor : '#aaa5f4',
    backgroundOpacity : '0',
    pixelColor : '#00092d',
    fill : true,
    circle: false,
    ledMode: true,
    borderSize: 2,
    duration: 1000
});

pixlerInstance.setNewImage([
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,0,0,0,0],
        [0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,1,1,1,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ]).then(() => console.log("fertig zeichnet"));

setTimeout(() => {
    pixlerInstance.setNewImage([[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],[0,0,1,0,1,0,0,1,1,1,0,0,0,1,1,0,1,0,0,0,0],[0,0,1,0,0,0,1,0,1,0,0,0,0,1,1,0,0,1,0,0,0],[0,0,1,0,1,0,0,0,0,0,0,0,1,1,1,1,0,1,0,0,0],[0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]])
}, 2500);
