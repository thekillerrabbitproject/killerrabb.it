/* eslint-disable no-console */
import fs from 'fs-extra';
import { glob } from 'glob';
import path from 'node:path';
import { Stream } from 'node:stream';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getFileName = (src, fullsize = false) => {
  const { length, [length - 1]: fileName } = src.split('/');

  const realname = fullsize ? fileName.replace('-scaled', '') : fileName;

  return realname;
};

const getPathWithFileName = (src, fullsize = false) => {
  const filePathArr = src.split('/');
  filePathArr.pop(); // remove image source
  const filePath = filePathArr.join('/');
  const realName = getFileName(src, fullsize);

  return `${filePath}/${realName}`;
};

const getFlatImages = async (
  pattern = 'public/static-assets/images/{post,video}/**/*.*',
) => {
  const flatImages = await glob([pattern], { ignore: ['**/*.webp'] });

  return flatImages;
};

const externalImagesDownloader = async ({
  manifest,
  destDir,
  pattern,
  remoteImagesDownloadsDelay,
}) => {
  console.log(
    `\n- Download ${manifest.length} external images to ${destDir} -`,
  );

  const promises = [];
  const downloadedImages = [];
  const reallyDownloadedImages = [];

  if (manifest.length === 0) return;

  for (const { slug, imageSrc, overrideName, fullsize = false } of manifest) {
    if (imageSrc === undefined) continue;

    const filename = overrideName || getFileName(imageSrc, fullsize);

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

        const body = await fetch(getPathWithFileName(imageSrc, fullsize))
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

  if (
    manifest.length > 0 &&
    manifest.length !== reallyDownloadedImages.length
  ) {
    const retryManifest = manifest.filter(function (obj) {
      return !reallyDownloadedImages.some(function (obj2) {
        const filename = getFileName(obj2.imageSrc, obj2?.fullsize);

        const outputPath = path.join(destDir, `${obj2.slug}/${filename}`);

        return outputPath === obj2.imageSrc && obj.slug === obj2.slug;
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
  const allFlatImages = await getFlatImages(pattern);

  if (manifest.length > 0 && allFlatImages.length !== manifest.length) {
    const mani = manifest
      .map((x) => {
        const filename = getFileName(x.imageSrc, x.fullsize);

        const outputPath = path.join(destDir, `${x.slug}/${filename}`);

        return { ...x, outputPath };
      })
      .filter((x) => !allFlatImages.includes(x.outputPath));

    if (mani.length > 0) {
      console.log(
        `\n- Sleep again 1sec then retry to download missing ${mani.length} images`,
      );

      await sleep(1000);
      await externalImagesDownloader({
        manifest: mani,
        destDir,
        pattern,
        remoteImagesDownloadsDelay: remoteImagesDownloadsDelay * 2,
      });

      return;
    }

    return;
  }

  return;
};

export default externalImagesDownloader;
