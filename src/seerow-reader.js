import { Pixel } from './pixel';
import { ImageReader } from './imageReader';

export class SeerowReader {


    constructor() {
        this.currentImageIndex = 0;
        this.currentPixels = new Array();
        this.currentPixelArray = new Array();
        this.isFinished = false;
        this.resolution = { x : 32, y : 32 };
        this.imageReader = new ImageReader(this.resolution.x * 10, this.resolution.y * 10);
        this.targetCanvas = document.getElementById("srw-pxl-drwr-targetcanvas");
        this.targetContext = this.targetCanvas.getContext("2d");
        this.SPEED = 50;
        this.images = document.getElementsByClassName('srw-img-rdr-src');
        this.backgroundColor = '#2bfeba';
        this.pixelColor = '#0b0b0b';
        this.fill = false;
        this.drawCircles = false;
        this.maxDistance = 0;
        this.ledMode = false;
        this.duration = 2000;
        this.borderSize = 2;
        this.targetContext.canvas.width = 640;
        this.targetContext.canvas.height = 640;
    }
    
    /**
     * Configuring all options
     * 
     */
    setOptions(options = {}) {

        if(options.resolution && options.resolution.x &&  options.resolution.y) {
            this.resolution = options.resolution;
        }

        if(options.speed) {
            this.SPEED = options.speed;
        }

        if(options.pixelColor) {
            this.pixelColor = options.pixelColor;
        }

        if(options.backgroundColor) {
            this.backgroundColor = this.hexToRgb(options.backgroundColor);
        }

        if(options.backgroundOpacity ) {
            this.backgroundOpacity = options.backgroundOpacity;
        } else {
            this.backgroundOpacity = 1;
        }

        if(options.fill) {
            this.fill = options.fill;
        }

        if(options.circle) {
            this.drawCircles = options.circle;
        }

        if(options.ledMode) {
            this.ledMode = options.ledMode;
        }

        if(options.borderSize) {
            this.borderSize = options.borderSize;
        }

        if(options.duration) {
            this.duration = options.duration;
        }

        this.imageReader.setOptions(options);
    }

    /**
     * Fills the hole canvas with the background color
     */
    fillCanvas() {
        this.targetContext.fillStyle = "rgba(" + this.backgroundColor.r + ","  +  this.backgroundColor.g + "," + this.backgroundColor.b + "," + this.backgroundOpacity + ")";

        if(!this.drawCircles) {
            for(var x = 0; x <= this.resolution.x; x++) {
                for(var y = 0; y <= this.resolution.y; y++) {
                    this.targetContext.clearRect(x * this.pixelSize().x, y * this.pixelSize().y, this.pixelSize().x - this.borderSize, this.pixelSize().y - this.borderSize);
                }
            }
        } else if(this.drawCircles) {
            this.targetContext.fillRect(0, 0, this.targetCanvas.width, this.targetCanvas.height);
        }

    }

    draw() {


        if(!this.ledMode) {
            this.targetContext.clearRect(0, 0, 640, 640);
            this.fillCanvas();
        }


        this.targetContext.fillStyle = this.pixelColor;

        var targetPixelMap;

        if(this.currentPixelArray.length > 0) {
            targetPixelMap = this.currentPixelArray
        }

        if(!targetPixelMap) {
            var image = this.images[this.currentImageIndex];
            targetPixelMap = this.imageReader.getPixels(image);
        }

        var targetPixels = this.imageReader.createPixels(targetPixelMap);

        targetPixels.forEach(pixel => {
            pixel.size = this.pixelSize();
            pixel.color = this.pixelColor;
            pixel.drawCircles = this.drawCircles;
            pixel.borderSize = this.borderSize;
        });

        if(this.currentPixels.length > 0) {
            if(this.ledMode) {
                this.targetContext.globalAlpha = 0;
                this.currentPixels.forEach(currentPixel => currentPixel.hide(this.targetContext, this.duration / 2));
                setTimeout(() => {
                    this.targetContext.globalAlpha = 1;
                    targetPixels.forEach(targetPixel => targetPixel.show(this.targetContext, this.duration / 2));
                }, this.duration / 2 + 200);
                this.currentPixels = targetPixels;
            } else {
                this.mapPixels(targetPixels, this.targetContext);
                this.movePixels(this.currentPixels, this.targetContext);
            }
        } else {
            this.drawOnCanvas(targetPixels, this.targetContext);
        }
    }

    movePixels(pixels, targetContext) {

        if(!this.isFinished) {
            var roundFinished = true;
            pixels.forEach(currentPixel => {          
                currentPixel.moveToTarget();
                if(!currentPixel.isSame()) {
                    roundFinished = false;
                }
            });

            this.isFinished = roundFinished;
            this.targetContext.fillStyle = "rgba(" + this.backgroundColor.r + ","  +  this.backgroundColor.g + "," + this.backgroundColor.b + "," + this.backgroundOpacity + ")";
       
       
            this.fillCanvas();

            pixels.forEach(currentPixel => {          
                currentPixel.drawOnCanvas(targetContext);
            });

            if(!this.isFinished) {
                setTimeout(() => {
                    this.movePixels(pixels, targetContext)
                }, this.SPEED);
            }
        } 
    }

    drawOnCanvas(pixels, targetContext) {
        this.currentPixels = pixels;
        pixels.forEach(pixel => {
            pixel.drawOnCanvas(targetContext);
        });

    }

    /**
     * Setup the new starting state, with exactly as many pixels as the target Image needs.
     * 
     */
    mapPixels(targetPixels, targetContext) {

        var missingPixels = targetPixels.length - this.currentPixels.length;
        var removedPixels = new Array();

        if(missingPixels > 0) {
            for(var i = 0; i < missingPixels; i++) {
                let element = this.currentPixels[Math.floor(Math.random() * this.currentPixels.length)];
                let pixel = new Pixel(element.x, element.y, this.borderSize, this.pixelSize(), this.pixelColor, this.drawCircles);
                this.currentPixels.push(pixel);
            }
        } else if (missingPixels < 0) {
            for(var i = missingPixels; i < 0; i++) {
                let randomNumber = Math.floor(Math.random() * (this.currentPixels.length - 1 ));
                this.currentPixels.splice(randomNumber, 1)[0];
            }
        }

        this.currentPixels.forEach(currentPixel => {
            currentPixel.configureTarget(targetPixels.pop());
        });

        this.currentPixels.forEach(currentPixel => {
            if(currentPixel.distanceToTarget > this.maxDistance) {
                this.maxDistance = currentPixel.distanceToTarget;
            }
        });



        this.currentPixels.forEach(currentPixel => {
           currentPixel.setRandomSteps(this.maxDistance);
        });

    }

    /**
     * Increase the current ImageIndex, go to 0 if higher then length of IMAGES Array
     * 
     */
    changeImage() {

        this.isFinished = false;
        this.currentImageIndex++;
        if(this.currentImageIndex >= this.images.length) {
            this.currentImageIndex = 0;
        }
        this.draw();
    }

    setNewImage(image) {

        if(image.length != this.resolution.x && image[0].length != this.resolution.y) {
            return new Error("provided array doesnt match resolution of drwr");
        } else {
            this.currentPixelArray = image;
            this.draw();
        }

    }

    pixelSize() {
        return {
            x : Math.floor(this.targetCanvas.width / this.resolution.x),
            y : Math.floor(this.targetCanvas.height / this.resolution.y)
        }
    }

    hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }


}