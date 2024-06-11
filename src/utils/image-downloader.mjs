/* eslint-disable no-console */
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
  console.log(
    `\n- Download ${manifest.length} external images to ${destDir} -`,
  );

  const promises = [];
  const downloadedImages = [];
  const reallyDownloadedImages = [];

  for (const { slug, imageSrc, overrideName } of manifest) {
    if (imageSrc === undefined) continue;

    const filename = overrideName || getFileName(imageSrc);

    const outputPath = path.join(destDir, `${slug}/${filename}`);

    if (fs.existsSync(outputPath)) {
      reallyDownloadedImages.push({ imageSrc, slug });
      continue;
    }

    if (downloadedImages.includes(imageSrc)) {
      reallyDownloadedImages.push({ imageSrc, slug });
      continue;
    }

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
          readableNodeStream.on('error', () => reject({ slug, imageSrc }));
          fileStream.on('finish', () =>
            // console.log(`\`${imageSrc}\` has been downloaded.`);

            resolve({ slug, imageSrc }),
          );
        });
      })(),
    );
  }

  await Promise.allSettled(promises).then((results) => {
    for (const result of results) {
      if (result.status === 'fulfilled') {
        reallyDownloadedImages.push(result.value);
      }
    }
  });

  console.log(
    `\n- From ${manifest.length} external images downloaded ${reallyDownloadedImages.length} -`,
  );

  if (manifest.length !== reallyDownloadedImages.length) {
    const retryManifest = manifest.filter(function (obj) {
      return !reallyDownloadedImages.some(function (obj2) {
        return obj.imageSrc === obj2.imageSrc && obj.slug === obj2.slug;
      });
    });

    if (retryManifest.length > 0) {
      console.log(
        `\n- Sleep 1sec then retry to download missing ${retryManifest.length} images`,
      );
      await sleep(1000);
      await externalImagesDownloader({
        manifest: retryManifest,
        destDir,
        remoteImagesDownloadsDelay: remoteImagesDownloadsDelay * 2,
      });

      return;
    }

    return;
  }

  return;
};

export default externalImagesDownloader;
