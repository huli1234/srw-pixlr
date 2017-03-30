seerow - Pixel Painter
===============================================================================

The seerow pixel painter, paints pixel images from source images on a <canvas>, it can animate between the provided images.

## Source images  ##

All images with the class "srw-img-rdr-src" are used as source images. These source images generate the Image Array

```
#!html

      <img class="srw-img-rdr-src" src="dist/heart.png">

```

## options ##
**selector** :  any query selector for the canvas that is to be used

**resolution** :  Resolution of the pixel image, needs to be a sqaure at the moment

**speed** :  Animation speed for one step (pixel move 1 pixel)

**backgroundColor** :  Backgroundcolor of the target image

**pixelColor** :  Color of the pixels

**fill** : fill the target image, defaults to false which draws only the outline

**circle** : draw circles instead of rectangles, defaults to false. (Background will be filled in one color)

**ledMode** : Pixels are removed then redrawn, no moving of pixels. Defaults to false


### Example ###
```
#!javascript
    SrwPixelDrawer.options({
        resolution : {
          x : 64,
          y : 64
        },
        speed : 10,
        backgroundColor : '#aa0000',
        pixelColor : '#0000aa',
        fill : true,
        circle : false,
        ledMode: true

    })

```

## Methods ##

**draw()** : Draws the image on the canvas with the id "srw-pxl-drwr-targetcanvas"

**changeImage()** : Draws the next image of the Image Array
