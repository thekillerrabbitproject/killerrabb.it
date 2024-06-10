import fs from 'fs-extra';
import { glob } from 'glob';
import path from 'node:path';
import sharp from 'sharp';

const getFileName = (src) => {
  const ext = path.extname(src);
  const [fileName] = src.split(ext);

  return fileName;
};

const getFileExtension = (src) => {
  const ext = path.extname(src);

  return ext;
};

const imageResizeAndBlur = async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('\n- Resizing and Blurring Images and Thumbnails -');

    const images = await glob(['public/static-assets/images/**/*.{jpg,jpeg}'], {
      ignore: 'public/static-assets/images/**/*-blur.{jpg,jpeg}',
    });

    for (const image of images) {
      const fileName = getFileName(image);
      const extension = getFileExtension(image);
      const newFilename = `${fileName}-blur${extension}`;

      // skip if already exists
      if (fs.existsSync(`${newFilename}`)) continue;

      // eslint-disable-next-line no-console
      console.log(`Resizing and blurring \`${fileName}\``);

      await sharp(image).resize(48).blur(5).toFile(newFilename);
    }
  } catch (error) {
    throw error;
  }
};

export default imageResizeAndBlur;
