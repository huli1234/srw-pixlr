import { SeerowReader } from './seerow-reader';

(function(window){

    'use strict';

    function define_library() {
        let SrwPixelDrawer = {};

        SrwPixelDrawer.create = options => {

            let instance = {};

            let reader = new SeerowReader();
            reader.setOptions(options);

            instance.options = options => {
                reader.setOptions(options);
            };
            instance.draw = () => {
                reader.draw();
            };
            instance.changeImage = () => {
                return reader.changeImage();
            };
            instance.setNewImage = image => {
                return reader.setNewImage(image);
            };
            return instance;
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