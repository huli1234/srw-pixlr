import { Pixel } from './pixel';

export class ImageReader {

    constructor() {

        this.resolution = { x : 32, y : 32 };
        this.canv = document.createElement('canvas');
        this.context = this.canv.getContext('2d');
        this.context.clearRect(0, 0, this.resolution.x * 10, this.resolution.y * 10);
        this.canv.id = 'srw-img-canvas';
        this.canv.style.cssText = 'display:none';
        document.body.appendChild(this.canv);
    }

    setOptions(options = {}) {

        if(options.resolution && options.resolution.x &&  options.resolution.y) {
            this.resolution = options.resolution;
        }

        if(options.fill) {
            this.fill = options.fill;
        }

    }

    getPixels(image) {

        this.context.clearRect(0, 0, this.resolution.x * 10, this.resolution.y * 10);
        image.crossOrigin = "Anonymous";
        this.context.drawImage(image, 0, 0, this.resolution.x, this.resolution.y);
        const imageData = this.context.getImageData(0, 0, this.resolution.x, this.resolution.y);
        let pixels = [];
        let newPixels = [];

        for(let i = 0; i <= this.resolution.x; i++) {
            pixels.push([]);
        }
        for(let i = 0; i <= this.resolution.y; i++) {
            newPixels.push([]);
        }

        for (let i=0; i < imageData.data.length; i += 4) {

            let y = Math.floor(i / (4 * this.resolution.y));
            let x = 0;

            if(y > 0) {
                x = Math.floor((i / 4) % (y * this.resolution.x));
            } else {
                x = i/4;
            }

            if(imageData.data[i+3] > 150) {
                pixels[x][y] = 1;
            } else {
                pixels[x][y] = 0;
            }
        }
        return pixels
    }

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
                        var newPixel = new Pixel(x, y);
                        imagePixels.push(newPixel);
                    } else {
                        newPixels[x][y] = 0;
                    }
                } else if(pixels[x][y] === 1) {
                    var newPixel = new Pixel(x, y);
                    imagePixels.push(newPixel);
                }
            }
        }
        return imagePixels;
    }
}