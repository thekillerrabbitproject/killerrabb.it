import fs from 'fs-extra';
import path from 'node:path';
import { Stream } from 'node:stream';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getFileName = (src) => {
  const { length, [length - 1]: fileName } = src.split('/');

  return fileName;
};

const externalImagesDownloader = async ({
  manifest,
  destDir,
  remoteImagesDownloadsDelay,
}) => {
  // eslint-disable-next-line no-console
  console.log('\n- Download external images -');

  const promises = [];
  const downloadedImages = [];

  for (const { slug, imageSrc, overrideName } of manifest) {
    if (imageSrc === undefined) continue;

    const filename = overrideName || getFileName(imageSrc);

    const outputPath = path.join(destDir, `${slug}/${filename}`);

    if (fs.existsSync(outputPath)) continue;

    if (downloadedImages.includes(imageSrc)) continue;

    if (remoteImagesDownloadsDelay) {
      await sleep(remoteImagesDownloadsDelay);
    }

    promises.push(
      (async () => {
        downloadedImages.push(imageSrc);

        await fs.ensureFile(outputPath);

        const body = await fetch(imageSrc)
          .then((response) => response.body)
          .catch((error) => {
            throw new Error(`Failed to download \`${imageSrc}\`: ${error}`);
          });

        if (body === null) {
          throw new Error(
            `Failed to download \`${imageSrc}\`: reason: body is null`,
          );
        }

        const readableNodeStream = Stream.Readable.fromWeb(body);
        const fileStream = fs.createWriteStream(outputPath);

        return new Promise((resolve, reject) => {
          readableNodeStream.pipe(fileStream);
          readableNodeStream.on('error', reject);
          fileStream.on('finish', () => {
            // eslint-disable-next-line no-console
            console.log(`\`${imageSrc}\` has been downloaded.`);
            resolve();
          });
        });
      })(),
    );
  }

  await Promise.all(promises);
};

export default externalImagesDownloader;
