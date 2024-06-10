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

const imageConverter = async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('\n- Converting Images and Thumbnails -');

    const images = await glob(['public/static-assets/images/**/*.{jpg,jpeg}'], {
      ignore: 'public/static-assets/images/**/*-blur.{jpg,jpeg}',
    });

    for (const image of images) {
      const fileName = getFileName(image);
      const newFilename = `${fileName}.webp`;

      // skip if already exists
      if (fs.existsSync(`${newFilename}`)) continue;

      // eslint-disable-next-line no-console
      console.log(`Converting \`${fileName}\` to webp`);

      await sharp(image).webp(webpConfig).toFile(newFilename);
    }
  } catch (error) {
    throw error;
  }
};

export default imageConverter;
