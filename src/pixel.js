export class Pixel {
    
    constructor(x, y, borderSize,size, color, drawCircles) {
        this.x = x;
        this.y = y;
        this.oldX = null;
        this.oldY = null;
        this.target = null;
        this.size = size;
        this.color = color;
        this.drawCircles = drawCircles;
        this.distanceToTarget = 0;
        this.randomSteps = 0;
        this.borderSize = borderSize;
    }

    configureTarget(target) {
        this.target = target;

        var xDistance = Math.abs(this.x - this.target.x);
        var yDistance = Math.abs(this.y - this.target.y);

        if(xDistance > yDistance) {
            this.distanceToTarget = xDistance;
        } else {
            this.distanceToTarget = yDistance;
        }
    }

    hide(targetContext, duration) {
        var randomDuration = Math.random() * duration;
        setTimeout(() => {
            targetContext.clearRect(this.x * this.size.x, this.y * this.size.y, this.size.x - this.borderSize, this.size.y - this.borderSize);
        }, randomDuration);
    }

    show(targetContext, duration) {
        var randomDuration = Math.random() * duration;
        setTimeout(() => {
            this.drawOnCanvas(targetContext);
        }, randomDuration);

    }

    setRandomSteps(maxDistance) {
        this.randomSteps = maxDistance - this.distanceToTarget;
    }

    moveToTarget() {
        if(this.x < this.target.x) {
            this.x = this.x + 1;
        } else if(this.x > this.target.x) {
            this.x = this.x - 1;
        }

        if(this.y < this.target.y) {
            this.y = this.y + 1;
        } else if(this.y > this.target.y) {
            this.y = this.y - 1;
        }
    }



    drawOnCanvas(targetContext) {
        targetContext.fillStyle = this.color;

        if(!this.drawCircles) {
            targetContext.fillRect(this.x * this.size.x, this.y * this.size.y, this.size.x - this.borderSize, this.size.y - this.borderSize);
        } else {
            targetContext.beginPath();
            targetContext.arc(this.x * this.size.x, this.y * this.size.y, (this.size.x - 1) / 2, 0, 2 * Math.PI, false);
            targetContext.closePath();
            targetContext.fill();
        }
    }

    isSame() {
        return (this.x === this.target.x && this.y === this.target.y);
    }


}

export default Pixel;