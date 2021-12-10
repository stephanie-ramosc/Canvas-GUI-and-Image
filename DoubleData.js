/* DoubleData: Data Structure to store scalar 2D images
   and associated methods/functions to convert and display */

/* --- Creation/allocation --- */

/* Create a new DoubleData scalar image data structure */
function DoubleData(width,height) {
    var doubleData = {}
    doubleData.width = width;
    doubleData.height = height;
    doubleData.data = new Array(width*height);
    return doubleData;
}

/* --- Utilities --- */

/* Check if imageData.data array field is allocated with correct size
  image can be in format ImageData or DoubleData */
function checkDataLength(imageData) {
    if (imageData.data instanceof Uint8ClampedArray) {
        // Check if data is allocated as RGBA
        if (imageData.data.length != imageData.width*imageData.height*4) {
            console.log(imageData)
            throw new Error('imageData.data is Uint8ClampedArray and not of length h*w*4');
        }
    }
    if (imageData.data instanceof Array) {
        // Check if data is allocated as scalar image
        if (imageData.data.length != imageData.width*imageData.height) {
            console.log(imageData)
            throw new Error('imageData.data is Array and not of length h*w');
        }
    }
}
/* Check if the images imageIn and imageOUt have same size
   and if their .data array is allocated with correct size
  images can be in format ImageData or DoubleData */
function checkSameSize(imageIn, imageOut) {
    if ((imageOut.width != imageIn.width) || (imageOut.height != imageIn.height)) {
        console.log(imageIn,imageOut)
        throw new Error('imageOut not same size as imageIn');
    }
    checkDataLength(imageIn)
    checkDataLength(imageOut)
}

/* --- Image comversion --- */

// Convert from RGBA to grey image
// imageRGBA: RGBA imageData
// imageGray: Scalar doubleData
function rgb2gray(imageRGBA, imageGray) {
    checkSameSize(imageRGBA, imageGray)

    var idx,n;

    for (var x=0; x<imageRGBA.width; x++)
    for (var y=0; y<imageRGBA.height; y++) {
        n = x+y*imageRGBA.width;
        idx = 4*n;

        avg = (imageRGBA.data[idx] + imageRGBA.data[idx+1] + imageRGBA.data[idx+2])/3;

        imageGray.data[n] = avg;
    }
}

// Convert from grey to RGBA image
// imageGray: Scalar doubleData
// imageRGBA: RGBA imageData
// range: array [a,b] of minimum and maximum value to display
function gray2rgb(imageGray, imageRGBA, range) {
    checkSameSize(imageGray, imageRGBA)
    if (range == undefined)
      range = [0,255];

    var u = range[1]-range[0];
    var v = range[0];

    var val,n,idx;
    for (var x=0; x<imageGray.width; x++)
    for (var y=0; y<imageGray.height; y++) {
        n = x+y*imageGray.width;
        idx = 4*n;

        val = (imageGray.data[n]-v)/u*255;

        imageRGBA.data[idx]   = val;
        imageRGBA.data[idx+1] = val;
        imageRGBA.data[idx+2] = val;
        imageRGBA.data[idx+3] = 255;
    }
}

// Display grey image
// imageGray: Scalar doubleData
function putDoubleData(ctx, imageGray, x,y, range) {
    if (x==undefined) x=0;
    if (y==undefined) y=0;
    if (range==undefined) range=[0,255]

    var imageRGBA = new ImageData(imageGray.width, imageGray.height)
    gray2rgb(imageGray, imageRGBA, range);
    ctx.putImageData(imageRGBA, x,y);
}
