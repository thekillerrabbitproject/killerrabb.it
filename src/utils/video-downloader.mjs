import fs from 'fs-extra';
import path from 'node:path';
import { Stream } from 'node:stream';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getFileName = (src) => {
  const { length, [length - 1]: fileName } = src.split('/');

  return fileName;
};

const externalVideosDownloader = async ({
  manifest,
  destDir,
  remoteVideosDownloadsDelay,
}) => {
  // eslint-disable-next-line no-console
  console.log(
    `\n- Download ${manifest.length} external videos to ${destDir} -`,
  );

  const promises = [];
  const downloadedVideos = [];

  for (const { slug, videoSrc } of manifest) {
    if (videoSrc === undefined) continue;

    const fileName = getFileName(videoSrc);

    const outputPath = path.join(destDir, `${slug}/${fileName}`);

    if (fs.existsSync(outputPath)) continue;

    if (downloadedVideos.includes(videoSrc)) continue;

    if (remoteVideosDownloadsDelay) {
      await sleep(remoteVideosDownloadsDelay);
    }

    promises.push(
      (async () => {
        downloadedVideos.push(videoSrc);

        await fs.ensureFile(outputPath);

        const body = await fetch(videoSrc)
          .then((response) => response.body)
          .catch((error) => {
            throw new Error(`Failed to download \`${videoSrc}\`: ${error}`);
          });

        if (body === null) {
          throw new Error(
            `Failed to download \`${videoSrc}\`: reason: body is null`,
          );
        }

        const readableNodeStream = Stream.Readable.fromWeb(body);
        const fileStream = fs.createWriteStream(outputPath);

        return new Promise((resolve, reject) => {
          readableNodeStream.pipe(fileStream);
          readableNodeStream.on('error', reject);
          fileStream.on('finish', () => {
            resolve();
          });
        });
      })(),
    );
  }

  await Promise.all(promises);
};

export default externalVideosDownloader;
