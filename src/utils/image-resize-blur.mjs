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

const jsonBlurCache = 'src/json/blur.json';

const imageResizeAndBlur = async () => {
  try {
    if (!fs.existsSync(jsonBlurCache)) {
      fs.writeFileSync(jsonBlurCache, JSON.stringify({}));
    }

    let imagesToBeSaved = JSON.parse(fs.readFileSync(jsonBlurCache));

    const images = await glob(['public/static-assets/**/*.{jpg,jpeg}'], {
      ignore: 'public/static-assets/shareImages/**/*',
    });

    // eslint-disable-next-line no-console
    console.log(
      `\n- Resizing and Blurring ${images.length} Images and Thumbnails -`,
    );

    for (const image of images) {
      const fileName = getFileName(image);
      const extension = getFileExtension(image);
      const fileKey = `${fileName}${extension}`;

      // skip if already exists
      if (imagesToBeSaved?.[fileKey]) continue;

      const bufferImage = await sharp(image).resize(48).blur(5).toBuffer();
      const base64Image = `data:image/${extension.replace(
        '.',
        '',
      )};base64,${bufferImage.toString('base64')}`;

      imagesToBeSaved = {
        ...imagesToBeSaved,
        [`${fileName}${extension}`]: `${base64Image}`,
      };
    }
    fs.writeFileSync(jsonBlurCache, JSON.stringify(imagesToBeSaved, null, 2));
  } catch (error) {
    throw error;
  }
};

await imageResizeAndBlur();
