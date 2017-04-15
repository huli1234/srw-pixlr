import { Pixel } from './pixel';
import { ImageReader } from './imageReader';

export class SeerowReader {


    constructor() {
        this.currentImageIndex = 0;
        this.currentPixels = [];
        this.currentPixelArray = [];
        this.isFinished = false;
        this.resolution = { x : 32, y : 32 };
        this.imageReader;
        this.targetCanvasList = document.querySelectorAll("srw-pxl-drwr-targetcanvas");
        this.targetContextList = [];

        if(this.targetCanvasList) {
            this.targetCanvasList.forEach(el => {
                this.targetContextList.push(el.getContext("2d"));
            });
        }
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
    }
    
    /**
     * Configuring all options
     * 
     */
    setOptions(options = {}) {

        if(options.selector) {
            this.targetCanvasList = document.querySelectorAll(options.selector);
            if(this.targetCanvasList) {
                this.targetCanvasList.forEach(el => {
                    this.targetContextList.push(el.getContext("2d"));
                });
            }
        }

        if(options.width && options.height) {
            this.targetCanvasList.forEach(el => {
                el.width = options.width;
                el.height = options.height;
            });
        }

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
            if(!this.ledMode) this.imageReader = new ImageReader(this.resolution.x * 10, this.resolution.y * 10);
        }

        if(options.borderSize) {
            this.borderSize = options.borderSize;
        }

        if(options.duration) {
            this.duration = options.duration;
        }

        if(this.imageReader) {
            this.imageReader.setOptions(options);
        }
    }

    /**
     * Fills the hole canvas with the background color
     */
    fillCanvas(context) {
        context.fillStyle = "rgba(" + this.backgroundColor.r + ","  +  this.backgroundColor.g + "," + this.backgroundColor.b + "," + this.backgroundOpacity + ")";
        if(!this.drawCircles) {
            for(let x = 0; x <= this.resolution.x; x++) {
                for(let y = 0; y <= this.resolution.y; y++) {
                    context.clearRect((this.x * this.size.x) + this.borderSize / 2, (this.y * this.size.y) + this.borderSize / 2, this.size.x - this.borderSize, this.size.y - this.borderSize);
                }
            }
        } else if(this.drawCircles) {
            context.fillRect(0, 0, this.targetCanvasList.width, this.targetCanvasList.height);
        }
    }

    /**
     *
     * @returns {Promise}
     */
    draw() {
        return new Promise((resolve, reject) => {
            if(!this.ledMode) {
                this.targetCanvasList.forEach(context => {
                    context.clearRect(0, 0, this.targetCanvasList.width, this.targetCanvasList.height);
                    this.fillCanvas(context);
                    context.fillStyle = this.pixelColor;
                });
            }

            let targetPixelMap;

            if(this.currentPixelArray.length > 0) {
                targetPixelMap = this.currentPixelArray
            }

            if(!targetPixelMap) {
                let image = this.images[this.currentImageIndex];
                targetPixelMap = this.imageReader.getPixels(image);
            }

            let targetPixels = this.createPixels(targetPixelMap);

            targetPixels.forEach(pixel => {
                pixel.size = this.pixelSize();
                pixel.color = this.pixelColor;
                pixel.drawCircles = this.drawCircles;
                pixel.borderSize = this.borderSize;
            });
            if(this.currentPixels.length > 0) {
                if(this.ledMode) {
                    let drawings = [];
                    this.targetContextList.forEach(ctx => {
                        drawings.push(this.drawLed(ctx, targetPixels));
                    });
                    Promise.all(drawings).then(() => {
                        this.currentPixels = targetPixels;
                        resolve();
                    }).catch();
                } else {
                    this.mapPixels(targetPixels, this.targetContextList);
                    this.movePixels(this.currentPixels, this.targetContextList).then(() => {
                        resolve();
                    });
                }
            } else {
                this.targetContextList.forEach(ctx => {
                    this.drawOnCanvas(targetPixels, ctx);
                })
            }
        });
    }

    drawLed(context, targetPixels) {
        return new Promise((resolve, reject) => {
            context.globalAlpha = 0;
            let hidePixels = [];

            this.currentPixels.forEach(currentPixel => {
                hidePixels.push(currentPixel.hide(context, this.duration / 2));
            });

            Promise.all(hidePixels).then(() => {
                context.globalAlpha = 1;
                let showPixels = [];
                targetPixels.forEach(targetPixel => {
                    let promise = new Promise((resolve, reject) => {
                        targetPixel.show(resolve, context, this.duration / 2);
                    });
                    showPixels.push(promise);
                });
                Promise.all(showPixels).then(() => {
                    resolve();
                });
            });
        })

    }

    movePixels(pixels, targetContext) {

        return new Promise((resolve, reject) => {
            if(!this.isFinished) {
                let roundFinished = true;
                pixels.forEach(currentPixel => {
                    currentPixel.moveToTarget();
                    if(!currentPixel.isSame()) {
                        roundFinished = false;
                    }
                });

                this.isFinished = roundFinished;
                targetContext.fillStyle = "rgba(" + this.backgroundColor.r + ","  +  this.backgroundColor.g + "," + this.backgroundColor.b + "," + this.backgroundOpacity + ")";


                this.fillCanvas(targetContext);

                pixels.forEach(currentPixel => {
                    currentPixel.drawOnCanvas(targetContext);
                });

                if(!this.isFinished) {
                    setTimeout(() => {
                        this.movePixels(pixels, targetContext)
                        resolve()
                    }, this.SPEED);
                } else {
                    resolve();
                }
            }
        })
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
    mapPixels(targetPixels) {

        let missingPixels = targetPixels.length - this.currentPixels.length;

        if(missingPixels > 0) {
            for(let i = 0; i < missingPixels; i++) {
                let element = this.currentPixels[Math.floor(Math.random() * this.currentPixels.length)];
                let pixel = new Pixel(element.x, element.y, this.borderSize, this.pixelSize(), this.pixelColor, this.drawCircles);
                this.currentPixels.push(pixel);
            }
        } else if (missingPixels < 0) {
            for(let i = missingPixels; i < 0; i++) {
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
        return this.draw();
    }

    setNewImage(image) {
        return new Promise((resolve, reject) => {
            if(image.length != this.resolution.x && image[0].length != this.resolution.y) {
                reject(new Error("provided array doesnt match resolution of drwr"));
            } else {
                this.currentPixelArray = image;
                this.draw().then(() => resolve());
            }
        })

    }

    pixelSize() {
        return {
            x : Math.floor(this.targetCanvasList[0].width / this.resolution.x),
            y : Math.floor(this.targetCanvasList[0].height / this.resolution.y)
        }
    }

    hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }


    /**
     * from an array of 1's and 0's create a new Array of Pixels
     *
     * @param pixels
     * @returns {Array}
     */
    createPixels(pixels) {

        let imagePixels = [];
        for(let x = 0; x < pixels.length; x++) {
            for(let y = 0; y < pixels[x].length; y++) {
                if(!this.fill) {
                    if(x + 2 >= pixels.length) {
                        newPixels[x][y] = 0;
                    } else if(x === 0) {
                        newPixels[x][y] = 0;
                    } else if(y === 0) {
                        newPixels[x][y] = 0;
                    } else if(y + 2 >= pixels[x].length ) {
                        newPixels[x][y] = 0;
                    } else if(pixels[x][y] === 1 &&
                        (pixels[x - 1][y] === 0 ||
                        pixels[x + 1][y] === 0||
                        pixels[x][y + 1] === 0||
                        pixels[x][y - 1] === 0)) {
                        imagePixels.push(new Pixel(x, y));
                    } else {
                        newPixels[x][y] = 0;
                    }
                } else if(pixels[x][y] === 1) {
                    imagePixels.push(new Pixel(x, y));
                }
            }
        }
        return imagePixels;
    }
}