import { SeerowReader } from './seerow-reader';

(function(window){

    'use strict';

    function define_library() {
        var SrwPixelDrawer = {};
        var reader = new SeerowReader();

        SrwPixelDrawer.options = (options) => {
            reader.setOptions(options);
        };

        SrwPixelDrawer.draw = () => {
            reader.draw();
        };
        SrwPixelDrawer.changeImage = () => {
            reader.changeImage();
        };
        SrwPixelDrawer.setNewImage = (image) => {
            reader.setNewImage(image);
        };
        return SrwPixelDrawer;
    }
    //define globally if it doesn't already exist
    if(typeof(SrwPixelDrawer) === 'undefined'){
        window.SrwPixelDrawer = define_library();
    } else{
        console.log("SrwPixelDrawer already defined.");
    }
})(window);