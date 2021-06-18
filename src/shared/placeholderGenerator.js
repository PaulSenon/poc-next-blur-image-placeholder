// import { loadImage, createCanvas } from 'canvas';
import { getBase64 as getBase64Blur } from '@plaiceholder/base64';
import { getPixelsCSS } from "@plaiceholder/css";
import { getBlurhash as getBlurhash2} from "@plaiceholder/blurhash";
import sharp from 'sharp';
import axios from 'axios';


const getImageBuffer = async url => {
  const response = await axios.get(url,  { responseType: 'arraybuffer' });
  return Buffer.from(response.data, "utf-8");
}

export const getBase64 = async url => {
  const buffer = await getImageBuffer(url);
  const base64 = await getBase64Blur(buffer);
  return base64;
};

export const getCss = async url => {
  const buffer = await getImageBuffer(url);
  const css = await getPixelsCSS(buffer);
  return css;
}

export const getBlurhash = async url => {
  const buffer = await getImageBuffer(url);
  const hash = await getBlurhash2(buffer);
  return hash;
}

export const getCustomLQIP = async (url, width = 32) => {
  const bufferIn = await getImageBuffer(url);
  const bufferOut = await sharp(bufferIn)
    // .normalise()
    // .modulate({
    //   saturation: 1.5,
    //   brightness: 1.2
    // })
    .median(3)
    .removeAlpha()
    // .median()
    // .sharpen()
    .resize({ width })
    .webp({ quality: 70,  })
    // .jpeg({ mozjpeg: true, quality: 70 })
    .toBuffer();
  const base64 = bufferOut.toString('base64');
  return `data:image/jpeg;base64,${base64}`;
}

export const getCustomLQIP2 = async (url, width = 32, target = 350) => {
  const bufferIn = await getImageBuffer(url);

  const shqbuffer = await sharp(bufferIn)
    // .blur(0.3) // the higher the lighter
    .removeAlpha()
    .resize({ width }) // the lower the lighter
    .webp({ quality: 80,  }) // the lower the lighter
    .toBuffer();
  const shqResult = `data:image/jpeg;base64,${shqbuffer.toString('base64')}`;
  if(shqResult.length <= target) return shqResult;

  const hqbuffer = await sharp(bufferIn)
    .blur(0.5) // the higher the lighter
    .removeAlpha()
    .resize({ width }) // the lower the lighter
    .webp({ quality: 70,  }) // the lower the lighter
    .toBuffer();
  const hqResult = `data:image/jpeg;base64,${hqbuffer.toString('base64')}`;
  if(hqResult.length <= target) {
    if (Math.abs(target-shqResult.length) <= Math.abs(target-hqResult.length)) return shqResult;
    return hqResult;
  }

  const mqbuffer = await sharp(bufferIn)
    .median(2) // the higher the lighter
    .blur(0.50) // the higher the lighter
    .removeAlpha()
    .resize({ width }) // the lower the lighter
    .webp({ quality: 75,  }) // the lower the lighter
    .toBuffer();
  const mqResult = `data:image/jpeg;base64,${mqbuffer.toString('base64')}`;
  if(mqResult.length <= target) {
    if (Math.abs(target-hqResult.length) <= Math.abs(target-mqResult.length)) return hqResult;
    return mqResult;
  } 
  const lqbuffer = await sharp(bufferIn)
    .median(3)
    .removeAlpha()
    .resize({ width })
    .webp({ quality: 70 })
    .toBuffer();
  const lqResult = `data:image/jpeg;base64,${lqbuffer.toString('base64')}`;
  if (Math.abs(target-mqResult.length) <= Math.abs(target-lqResult.length)) return mqResult;
  return lqResult;
}