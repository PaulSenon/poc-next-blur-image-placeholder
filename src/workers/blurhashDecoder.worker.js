import { decode } from 'blurhash';

let ctx;
let pixels;
let imageData;

self.onmessage = async m => {
    let {
        hash,
        width,
        height,
        xCount,
        yCount,
        punch = 1,
        canvas,
        smooth = 'high',
    } = m.data;

    console.time(`decode ${hash}`);

    canvas.width = width || canvas.width;
    canvas.height = height || canvas.height;
    ctx = canvas.getContext('2d');

    // get pixels from blurhash
    // :info: most important is to keep low values in decode width/height. 
    // some tutorial might say to set you image final size, but please dont ! (takes forever to process)
    // instead we generate the minimun size, and we upscale it with good smooth algorithm (important)
    pixels = decode(hash, xCount, yCount, punch);

    // create image from pixels
    imageData = ctx.createImageData(xCount, yCount);
    imageData.data.set(pixels);
    const img = await createImageBitmap(imageData, 0, 0, xCount,  yCount);

    // draw upscalled image + smooth
    ctx.imageSmoothingEnabled = !!smooth;
    if (['low', 'medium', 'high'].includes(smooth)) ctx.imageSmoothingQuality = smooth;
    ctx.drawImage(img, 0,0, canvas.width, canvas.height);

    console.timeEnd(`decode ${hash}`);

    // nothing to return/send, thanks to offscreenCanvas
}
