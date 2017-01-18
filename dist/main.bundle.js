!function(t){function e(r){if(i[r])return i[r].exports;var n=i[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,r){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=3)}([function(t,e,i){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}(),s=e.Pixel=function(){function t(e,i,n,s,a,o){r(this,t),this.x=e,this.y=i,this.target=null,this.size=s,this.color=a,this.drawCircles=o,this.distanceToTarget=0,this.borderSize=n}return n(t,[{key:"configureTarget",value:function(t){this.target=t;var e=Math.abs(this.x-this.target.x),i=Math.abs(this.y-this.target.y);e>i?this.distanceToTarget=e:this.distanceToTarget=i}},{key:"hide",value:function(t,e){var i=this,r=Math.random()*e;setTimeout(function(){t.clearRect(i.x*i.size.x,i.y*i.size.y,i.size.x-i.borderSize,i.size.y-i.borderSize)},r)}},{key:"show",value:function(t,e){var i=this,r=Math.random()*e;setTimeout(function(){i.drawOnCanvas(t)},r)}},{key:"setRandomSteps",value:function(t){this.randomSteps=t-this.distanceToTarget}},{key:"moveToTarget",value:function(){this.x<this.target.x?this.x=this.x+1:this.x>this.target.x&&(this.x=this.x-1),this.y<this.target.y?this.y=this.y+1:this.y>this.target.y&&(this.y=this.y-1)}},{key:"drawOnCanvas",value:function(t){t.fillStyle=this.color,this.drawCircles?(t.beginPath(),t.arc(this.x*this.size.x,this.y*this.size.y,(this.size.x-1)/2,0,2*Math.PI,!1),t.closePath(),t.fill()):t.fillRect(this.x*this.size.x,this.y*this.size.y,this.size.x-this.borderSize,this.size.y-this.borderSize)}},{key:"isSame",value:function(){return this.x===this.target.x&&this.y===this.target.y}}]),t}();e.default=s},function(t,e,i){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.SeerowReader=void 0;var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}(),s=i(0),a=i(2);e.SeerowReader=function(){function t(){r(this,t),this.currentImageIndex=0,this.currentPixels=new Array,this.currentPixelArray=new Array,this.isFinished=!1,this.resolution={x:32,y:32},this.imageReader=new a.ImageReader(10*this.resolution.x,10*this.resolution.y),this.targetCanvas=document.getElementById("srw-pxl-drwr-targetcanvas"),this.targetContext=this.targetCanvas.getContext("2d"),this.SPEED=50,this.images=document.getElementsByClassName("srw-img-rdr-src"),this.backgroundColor="#2bfeba",this.pixelColor="#0b0b0b",this.fill=!1,this.drawCircles=!1,this.maxDistance=0,this.ledMode=!1,this.duration=2e3,this.borderSize=2,this.targetContext.canvas.width=640,this.targetContext.canvas.height=640}return n(t,[{key:"setOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t.resolution&&t.resolution.x&&t.resolution.y&&(this.resolution=t.resolution),t.speed&&(this.SPEED=t.speed),t.pixelColor&&(this.pixelColor=t.pixelColor),t.backgroundColor&&(this.backgroundColor=this.hexToRgb(t.backgroundColor)),t.backgroundOpacity?this.backgroundOpacity=t.backgroundOpacity:this.backgroundOpacity=1,t.fill&&(this.fill=t.fill),t.circle&&(this.drawCircles=t.circle),t.ledMode&&(this.ledMode=t.ledMode),t.borderSize&&(this.borderSize=t.borderSize),t.duration&&(this.duration=t.duration),this.imageReader.setOptions(t)}},{key:"fillCanvas",value:function(){if(this.targetContext.fillStyle="rgba("+this.backgroundColor.r+","+this.backgroundColor.g+","+this.backgroundColor.b+","+this.backgroundOpacity+")",this.drawCircles)this.drawCircles&&this.targetContext.fillRect(0,0,this.targetCanvas.width,this.targetCanvas.height);else for(var t=0;t<=this.resolution.x;t++)for(var e=0;e<=this.resolution.y;e++)this.targetContext.clearRect(t*this.pixelSize().x,e*this.pixelSize().y,this.pixelSize().x-this.borderSize,this.pixelSize().y-this.borderSize)}},{key:"draw",value:function(){var t=this;this.ledMode||(this.targetContext.clearRect(0,0,640,640),this.fillCanvas()),this.targetContext.fillStyle=this.pixelColor;var e;if(this.currentPixelArray.length>0&&(e=this.currentPixelArray),!e){var i=this.images[this.currentImageIndex];e=this.imageReader.getPixels(i)}var r=this.imageReader.createPixels(e);r.forEach(function(e){e.size=t.pixelSize(),e.color=t.pixelColor,e.drawCircles=t.drawCircles,e.borderSize=t.borderSize}),this.currentPixels.length>0?this.ledMode?(this.targetContext.globalAlpha=0,this.currentPixels.forEach(function(e){return e.hide(t.targetContext,t.duration/2)}),setTimeout(function(){t.targetContext.globalAlpha=1,r.forEach(function(e){return e.show(t.targetContext,t.duration/2)})},this.duration/2+200),this.currentPixels=r):(this.mapPixels(r,this.targetContext),this.movePixels(this.currentPixels,this.targetContext)):this.drawOnCanvas(r,this.targetContext)}},{key:"movePixels",value:function(t,e){var i=this;if(!this.isFinished){var r=!0;t.forEach(function(t){t.moveToTarget(),t.isSame()||(r=!1)}),this.isFinished=r,this.targetContext.fillStyle="rgba("+this.backgroundColor.r+","+this.backgroundColor.g+","+this.backgroundColor.b+","+this.backgroundOpacity+")",this.fillCanvas(),t.forEach(function(t){t.drawOnCanvas(e)}),this.isFinished||setTimeout(function(){i.movePixels(t,e)},this.SPEED)}}},{key:"drawOnCanvas",value:function(t,e){this.currentPixels=t,t.forEach(function(t){t.drawOnCanvas(e)})}},{key:"mapPixels",value:function(t,e){var i=this,r=t.length-this.currentPixels.length;new Array;if(r>0)for(var n=0;n<r;n++){var a=this.currentPixels[Math.floor(Math.random()*this.currentPixels.length)],o=new s.Pixel(a.x,a.y,this.borderSize,this.pixelSize(),this.pixelColor,this.drawCircles);this.currentPixels.push(o)}else if(r<0)for(var n=r;n<0;n++){var l=Math.floor(Math.random()*(this.currentPixels.length-1));this.currentPixels.splice(l,1)[0]}this.currentPixels.forEach(function(e){e.configureTarget(t.pop())}),this.currentPixels.forEach(function(t){t.distanceToTarget>i.maxDistance&&(i.maxDistance=t.distanceToTarget)}),this.currentPixels.forEach(function(t){t.setRandomSteps(i.maxDistance)})}},{key:"changeImage",value:function(){this.isFinished=!1,this.currentImageIndex++,this.currentImageIndex>=this.images.length&&(this.currentImageIndex=0),this.draw()}},{key:"setNewImage",value:function(t){return t.length!=this.resolution.x&&t[0].length!=this.resolution.y?new Error("provided array doesnt match resolution of drwr"):(this.currentPixelArray=t,void this.draw())}},{key:"pixelSize",value:function(){return{x:Math.floor(this.targetCanvas.width/this.resolution.x),y:Math.floor(this.targetCanvas.height/this.resolution.y)}}},{key:"hexToRgb",value:function(t){var e=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;t=t.replace(e,function(t,e,i,r){return e+e+i+i+r+r});var i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return i?{r:parseInt(i[1],16),g:parseInt(i[2],16),b:parseInt(i[3],16)}:null}}]),t}()},function(t,e,i){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.ImageReader=void 0;var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}(),s=i(0);e.ImageReader=function(){function t(){r(this,t),this.resolution={x:32,y:32},this.canv=document.createElement("canvas"),this.context=this.canv.getContext("2d"),this.context.clearRect(0,0,10*this.resolution.x,10*this.resolution.y),this.canv.id="srw-img-canvas",this.canv.style.cssText="display:none",document.body.appendChild(this.canv)}return n(t,[{key:"setOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t.resolution&&t.resolution.x&&t.resolution.y&&(this.resolution=t.resolution),t.fill&&(this.fill=t.fill)}},{key:"getPixels",value:function(t){this.context.clearRect(0,0,10*this.resolution.x,10*this.resolution.y),t.crossOrigin="Anonymous",this.context.drawImage(t,0,0,this.resolution.x,this.resolution.y);for(var e=this.context.getImageData(0,0,this.resolution.x,this.resolution.y),i=new Array,r=new Array,n=0;n<=this.resolution.x;n++)i.push([]);for(var n=0;n<=this.resolution.y;n++)r.push([]);for(var n=0;n<e.data.length;n+=4){var s=Math.floor(n/(4*this.resolution.y)),a=0;a=s>0?Math.floor(n/4%(s*this.resolution.x)):n/4,e.data[n+3]>150?i[a][s]=1:i[a][s]=0}return i}},{key:"createPixels",value:function(t){for(var e=new Array,i=0;i<t.length;i++)for(var r=0;r<t[i].length;r++)if(this.fill){if(1===t[i][r]){var n=new s.Pixel(i,r);e.push(n)}}else if(i+2>=t.length)newPixels[i][r]=0;else if(0===i)newPixels[i][r]=0;else if(0===r)newPixels[i][r]=0;else if(r+2>=t[i].length)newPixels[i][r]=0;else if(1!==t[i][r]||0!==t[i-1][r]&&0!==t[i+1][r]&&0!==t[i][r+1]&&0!==t[i][r-1])newPixels[i][r]=0;else{var n=new s.Pixel(i,r);e.push(n)}return e}}]),t}()},function(t,e,i){"use strict";var r=i(1);!function(t){function e(){var t={},e=new r.SeerowReader;return t.options=function(t){e.setOptions(t)},t.draw=function(){e.draw()},t.changeImage=function(){e.changeImage()},t.setNewImage=function(t){e.setNewImage(t)},t}"undefined"==typeof SrwPixelDrawer?t.SrwPixelDrawer=e():console.log("SrwPixelDrawer already defined.")}(window)}]);