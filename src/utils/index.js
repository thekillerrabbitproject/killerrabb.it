import blurImageCache from '@/json/blur.json';

try {
  JSON.parse(JSON.stringify(blurImageCache));
} catch (error) {
  throw new Error('blurImageCache failed', error);
}

export const getBlurImage = (image) => {
  try {
    return blurImageCache[`public${image}`];
  } catch (error) {
    throw new Error(`getBlurImage failed for ${image}`, error);
  }
};

export const removeScaled = (name) => name.replace('-scaled', '');

export const isDuplicatedFromGallery = (content) => {
  const {
    featuredImageId,
    acf: { gallery },
  } = content;

  return !!gallery.some(({ id }) => id === featuredImageId);
};

export const getFilmString = (content, styles) => {
  const {
    films: { nodes },
  } = content;

  return nodes
    .map((film) => styles?.[film.slug])
    .filter(Boolean)
    .join(' ');
};

export const getShareImage = ({ slug, postType }) => {
  const type = postType ? `/${postType.toLowerCase()}/` : '';

  return `/static-assets/shareImages${type}${slug}/share.png`;
};

export const getVideoName = (slug, videoSrc) => {
  const { length, [length - 1]: fileName } = videoSrc.split('/');

  return `/static-assets/${fileName}`;
};

export const getImageLocalSrc = ({ sourceUrl }) => {
  try {
    const newPath = '/static-assets/';
    const { length, [length - 1]: rawFileName } = sourceUrl.split('/');
    const [fileName, originalExtension] = rawFileName.split('.');

    const jpg = `${newPath}${fileName}.${originalExtension}`;
    const webp = `${newPath}${fileName}.webp`;
    const blur = getBlurImage(jpg);

    return {
      jpg,
      webp,
      blur,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const getMetadata = ({ title, slug, postType, metadataBase }) => {
  const shareImage = getShareImage({ slug, postType });
  const lowerCasePostType = postType ? postType.toLowerCase() : 'post';
  const canonicalPrefix = lowerCasePostType === 'post' ? '' : lowerCasePostType;

  const canonical = `${canonicalPrefix}/${slug}`;

  return {
    title,
    openGraph: {
      images: [shareImage],
      url: canonical,
      type: 'website',
    },
    twitter: {
      url: canonical,
    },
    other: {
      image: `${metadataBase.toString().replace(/\/$/, '')}${shareImage}`,
    },
    alternates: {
      canonical,
    },
  };
};
