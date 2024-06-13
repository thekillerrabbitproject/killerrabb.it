/* eslint-disable no-console */
import fs from 'fs-extra';
import { glob } from 'glob';
import path from 'node:path';
import sharp from 'sharp';

const webpConfig = {
  quality: 100,
  lossless: true,
  effort: 0,
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getFileName = (src) => {
  const ext = path.extname(src);
  const [fileName] = src.split(ext);

  return fileName;
};

const getWebpImages = async () => {
  const webpImages = await glob(['public/static-assets/**/*.webp']);

  return webpImages;
};

const getFlatImages = async () => {
  const flatImages = await glob(['public/static-assets/*.{jpg,jpeg}'], {
    ignore: ['**/*.webp', 'public/static-assets/shareImages/**/*'],
  });

  return flatImages;
};

const convertedImages = [];
const imageConverter = async () => {
  try {
    const flatImages = await getFlatImages();

    const webpImages = await getWebpImages();

    const missingImages = flatImages.filter((x) => {
      const [name] = x.split('.');

      return !webpImages.includes(`${name}.webp`);
    });

    const images = missingImages.length > 0 ? missingImages : flatImages;

    console.log(
      `\n- Converting ${images.length} Images and Thumbnails to webp -`,
    );

    for (const image of images) {
      const fileName = getFileName(image);
      const newFilename = `${fileName}.webp`;

      // skip if already exists
      if (fs.existsSync(`${newFilename}`)) {
        convertedImages.push(newFilename);
        continue;
      }

      const convert = async (img) => {
        await sharp(img).webp(webpConfig).toFile(newFilename);

        if (!fs.existsSync(`${newFilename}`)) {
          console.log('\n- Failed somehow, trying again in 1 second');
          await sleep(1000);
          await convert(image);
        }
      };

      await convert(image);

      convertedImages.push(newFilename);
    }

    console.log(
      `\n- From ${images.length} Images and Thumbnails converted ${convertedImages.length} -`,
    );

    const allWebpImages = await getWebpImages();
    const allFlatImages = await getFlatImages();

    const missingImagesRerun = allFlatImages.filter((x) => {
      const [name] = x.split('.');

      return !allWebpImages.includes(`${name}.webp`);
    });

    if (missingImagesRerun.length > 0) {
      await imageConverter();

      return;
    }

    return;
  } catch (error) {
    throw error;
  }
};

await imageConverter();
