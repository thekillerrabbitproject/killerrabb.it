import fs from 'fs-extra';
import { glob } from 'glob';
import path from 'node:path';
import sharp from 'sharp';

const webpConfig = {
  quality: 100,
  lossless: true,
  effort: 0,
};

const getFileName = (src) => {
  const ext = path.extname(src);
  const [fileName] = src.split(ext);

  return fileName;
};
const convertedImages = [];
const imageConverter = async () => {
  try {
    const images = await glob(['public/static-assets/images/**/*.{jpg,jpeg}'], {
      ignore: 'public/static-assets/images/**/*-blur.{jpg,jpeg}',
    });

    // eslint-disable-next-line no-console
    console.log(
      `\n- Converting ${images.length} Images and Thumbnails to webp -`,
    );

    for (const image of images) {
      const fileName = getFileName(image);
      const newFilename = `${fileName}.webp`;

      // skip if already exists
      if (fs.existsSync(`${newFilename}`)) continue;

      await sharp(image).webp(webpConfig).toFile(newFilename);
      convertedImages.push(newFilename);
    }
    // eslint-disable-next-line no-console
    console.log(
      `\n- From ${images.length} Images and Thumbnails converted ${convertedImages.length} -`,
    );
  } catch (error) {
    throw error;
  }
};

export default imageConverter;
