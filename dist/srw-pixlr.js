!function(e){function t(r){if(i[r])return i[r].exports;var n=i[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var i={};t.m=e,t.c=i,t.i=function(e){return e},t.d=function(e,i,r){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,i){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),s=t.Pixel=function(){function e(t,i,n,s,o,a){r(this,e),this.x=t,this.y=i,this.target=null,this.size=s,this.color=o,this.drawCircles=a,this.distanceToTarget=0,this.borderSize=n}return n(e,[{key:"configureTarget",value:function(e){this.target=e;var t=Math.abs(this.x-this.target.x),i=Math.abs(this.y-this.target.y);this.distanceToTarget=t>i?t:i}},{key:"hide",value:function(e,t){var i=this;return new Promise(function(r,n){var s=Math.random()*t;setTimeout(function(){e.clearRect(i.x*i.size.x+i.borderSize/2,i.y*i.size.y+i.borderSize/2,i.size.x-i.borderSize,i.size.y-i.borderSize),r()},s)})}},{key:"show",value:function(e,t,i){var r=this,n=Math.random()*i;setTimeout(function(){r.drawOnCanvas(t),e()},n)}},{key:"moveToTarget",value:function(){this.x<this.target.x?this.x=this.x+1:this.x>this.target.x&&(this.x=this.x-1),this.y<this.target.y?this.y=this.y+1:this.y>this.target.y&&(this.y=this.y-1)}},{key:"drawOnCanvas",value:function(e){e.fillStyle=this.color,this.drawCircles?(e.beginPath(),e.arc(this.x*this.size.x,this.y*this.size.y,(this.size.x-1)/2,0,2*Math.PI,!1),e.closePath(),e.fill()):e.fillRect(this.x*this.size.x+this.borderSize/2,this.y*this.size.y+this.borderSize/2,this.size.x-this.borderSize,this.size.y-this.borderSize)}},{key:"isSame",value:function(){return this.x===this.target.x&&this.y===this.target.y}}]),e}();t.default=s},function(e,t,i){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.SeerowReader=void 0;var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),s=i(0),o=i(2);t.SeerowReader=function(){function e(){var t=this;r(this,e),this.currentImageIndex=0,this.currentPixels=[],this.currentPixelArray=[],this.isFinished=!1,this.resolution={x:32,y:32},this.imageReader=new o.ImageReader(10*this.resolution.x,10*this.resolution.y),this.targetCanvasList=document.querySelectorAll("srw-pxl-drwr-targetcanvas"),this.targetContextList=[],this.targetCanvasList&&this.targetCanvasList.forEach(function(e){t.targetContextList.push(e.getContext("2d"))}),this.SPEED=50,this.images=document.getElementsByClassName("srw-img-rdr-src"),this.backgroundColor="#2bfeba",this.pixelColor="#0b0b0b",this.fill=!1,this.drawCircles=!1,this.maxDistance=0,this.ledMode=!1,this.duration=2e3,this.borderSize=2}return n(e,[{key:"setOptions",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t.selector&&(this.targetCanvasList=document.querySelectorAll(t.selector),this.targetCanvasList&&this.targetCanvasList.forEach(function(t){e.targetContextList.push(t.getContext("2d"))})),t.width&&t.height&&this.targetCanvasList.forEach(function(e){e.width=t.width,e.height=t.height}),t.resolution&&t.resolution.x&&t.resolution.y&&(this.resolution=t.resolution),t.speed&&(this.SPEED=t.speed),t.pixelColor&&(this.pixelColor=t.pixelColor),t.backgroundColor&&(this.backgroundColor=this.hexToRgb(t.backgroundColor)),t.backgroundOpacity?this.backgroundOpacity=t.backgroundOpacity:this.backgroundOpacity=1,t.fill&&(this.fill=t.fill),t.circle&&(this.drawCircles=t.circle),t.ledMode&&(this.ledMode=t.ledMode),t.borderSize&&(this.borderSize=t.borderSize),t.duration&&(this.duration=t.duration),this.imageReader.setOptions(t)}},{key:"fillCanvas",value:function(e){if(e.fillStyle="rgba("+this.backgroundColor.r+","+this.backgroundColor.g+","+this.backgroundColor.b+","+this.backgroundOpacity+")",this.drawCircles)this.drawCircles&&e.fillRect(0,0,this.targetCanvasList.width,this.targetCanvasList.height);else for(var t=0;t<=this.resolution.x;t++)for(var i=0;i<=this.resolution.y;i++)e.clearRect(this.x*this.size.x+this.borderSize/2,this.y*this.size.y+this.borderSize/2,this.size.x-this.borderSize,this.size.y-this.borderSize)}},{key:"draw",value:function(){var e=this;return new Promise(function(t,i){e.ledMode||e.targetCanvasList.forEach(function(t){t.clearRect(0,0,e.targetCanvasList.width,e.targetCanvasList.height),e.fillCanvas(t),t.fillStyle=e.pixelColor});var r=void 0;if(e.currentPixelArray.length>0&&(r=e.currentPixelArray),!r){var n=e.images[e.currentImageIndex];r=e.imageReader.getPixels(n)}var s=e.imageReader.createPixels(r);if(s.forEach(function(t){t.size=e.pixelSize(),t.color=e.pixelColor,t.drawCircles=e.drawCircles,t.borderSize=e.borderSize}),e.currentPixels.length>0)if(e.ledMode){var o=[];e.targetContextList.forEach(function(t){o.push(e.drawLed(t,s))}),Promise.all(o).then(function(){t()}).catch()}else e.mapPixels(s,e.targetContextList),e.movePixels(e.currentPixels,e.targetContextList).then(function(){t()});else e.targetContextList.forEach(function(t){e.drawOnCanvas(s,t)})})}},{key:"drawLed",value:function(e,t){var i=this;return new Promise(function(r,n){e.globalAlpha=0;var s=[];i.currentPixels.forEach(function(t){s.push(t.hide(e,i.duration/2))}),Promise.all(s).then(function(){e.globalAlpha=1;var n=[];t.forEach(function(t){var r=new Promise(function(r,n){t.show(r,e,i.duration/2)});n.push(r)}),Promise.all(n).then(function(){r()})})})}},{key:"movePixels",value:function(e,t){var i=this;return new Promise(function(r,n){if(!i.isFinished){var s=!0;e.forEach(function(e){e.moveToTarget(),e.isSame()||(s=!1)}),i.isFinished=s,t.fillStyle="rgba("+i.backgroundColor.r+","+i.backgroundColor.g+","+i.backgroundColor.b+","+i.backgroundOpacity+")",i.fillCanvas(t),e.forEach(function(e){e.drawOnCanvas(t)}),i.isFinished?r():setTimeout(function(){i.movePixels(e,t),r()},i.SPEED)}})}},{key:"drawOnCanvas",value:function(e,t){this.currentPixels=e,e.forEach(function(e){e.drawOnCanvas(t)})}},{key:"mapPixels",value:function(e){var t=this,i=e.length-this.currentPixels.length;if(i>0)for(var r=0;r<i;r++){var n=this.currentPixels[Math.floor(Math.random()*this.currentPixels.length)],o=new s.Pixel(n.x,n.y,this.borderSize,this.pixelSize(),this.pixelColor,this.drawCircles);this.currentPixels.push(o)}else if(i<0)for(var a=i;a<0;a++){var l=Math.floor(Math.random()*(this.currentPixels.length-1));this.currentPixels.splice(l,1)[0]}this.currentPixels.forEach(function(t){t.configureTarget(e.pop())}),this.currentPixels.forEach(function(e){e.distanceToTarget>t.maxDistance&&(t.maxDistance=e.distanceToTarget)}),this.currentPixels.forEach(function(e){e.setRandomSteps(t.maxDistance)})}},{key:"changeImage",value:function(){return this.isFinished=!1,this.currentImageIndex++,this.currentImageIndex>=this.images.length&&(this.currentImageIndex=0),this.draw()}},{key:"setNewImage",value:function(e){var t=this;return new Promise(function(i,r){e.length!=t.resolution.x&&e[0].length!=t.resolution.y?r(new Error("provided array doesnt match resolution of drwr")):(t.currentPixelArray=e,t.draw().then(function(){return i()}))})}},{key:"pixelSize",value:function(){return{x:Math.floor(this.targetCanvasList[0].width/this.resolution.x),y:Math.floor(this.targetCanvasList[0].height/this.resolution.y)}}},{key:"hexToRgb",value:function(e){e=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(e,t,i,r){return t+t+i+i+r+r});var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null}}]),e}()},function(e,t,i){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.ImageReader=void 0;var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),s=i(0);t.ImageReader=function(){function e(){r(this,e),this.resolution={x:32,y:32},this.canv=document.createElement("canvas"),this.context=this.canv.getContext("2d"),this.context.clearRect(0,0,10*this.resolution.x,10*this.resolution.y),this.canv.id="srw-img-canvas",this.canv.style.cssText="display:none",document.body.appendChild(this.canv)}return n(e,[{key:"setOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e.resolution&&e.resolution.x&&e.resolution.y&&(this.resolution=e.resolution),e.fill&&(this.fill=e.fill)}},{key:"getPixels",value:function(e){this.context.clearRect(0,0,10*this.resolution.x,10*this.resolution.y),e.crossOrigin="Anonymous",this.context.drawImage(e,0,0,this.resolution.x,this.resolution.y);for(var t=this.context.getImageData(0,0,this.resolution.x,this.resolution.y),i=[],r=[],n=0;n<=this.resolution.x;n++)i.push([]);for(var s=0;s<=this.resolution.y;s++)r.push([]);for(var o=0;o<t.data.length;o+=4){var a=Math.floor(o/(4*this.resolution.y)),l=0;l=a>0?Math.floor(o/4%(a*this.resolution.x)):o/4,t.data[o+3]>150?i[l][a]=1:i[l][a]=0}return i}},{key:"createPixels",value:function(e){for(var t=[],i=0;i<e.length;i++)for(var r=0;r<e[i].length;r++)if(this.fill){if(1===e[i][r]){var n=new s.Pixel(i,r);t.push(n)}}else if(i+2>=e.length)newPixels[i][r]=0;else if(0===i)newPixels[i][r]=0;else if(0===r)newPixels[i][r]=0;else if(r+2>=e[i].length)newPixels[i][r]=0;else if(1!==e[i][r]||0!==e[i-1][r]&&0!==e[i+1][r]&&0!==e[i][r+1]&&0!==e[i][r-1])newPixels[i][r]=0;else{var n=new s.Pixel(i,r);t.push(n)}return t}}]),e}()},function(e,t,i){"use strict";var r=i(1);!function(e){"undefined"==typeof SrwPixelDrawer?e.SrwPixelDrawer=function(){var e={};return e.create=function(e){var t={},i=new r.SeerowReader;return i.setOptions(e),t.options=function(e){i.setOptions(e)},t.draw=function(){i.draw()},t.changeImage=function(){return i.changeImage()},t.setNewImage=function(e){return i.setNewImage(e)},t},e}():console.log("SrwPixelDrawer already defined.")}(window)}]);
//# sourceMappingURL=srw-pixlr.js.map