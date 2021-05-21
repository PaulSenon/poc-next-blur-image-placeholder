// import { loadImage, createCanvas } from 'canvas';
import { getBase64 as getBase64Blur } from '@plaiceholder/base64';
import { getPixelsCSS } from "@plaiceholder/css";
import { getBlurhash as getBlurhash2} from "@plaiceholder/blurhash";

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