import blurImageCache from '@/json/blur.json';

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

  return `/static-assets/shareimages${type}${slug}/share.png`;
};

export const getVideoName = (slug, videoSrc) => {
  const { length, [length - 1]: fileName } = videoSrc.split('/');

  return `/static-assets/videos/${slug}/${fileName}`;
};

export const getImageLocalSrc = ({
  slug = '',
  sourceUrl,
  pathPrefix = '',
  isThumbnail = false,
  isFeatured = false,
}) => {
  try {
    const thumbPath = isThumbnail ? 'thumbnails/' : '';
    const featuredPath = isFeatured ? 'featured/' : '';
    const newPath = `/static-assets/images/${pathPrefix}${slug}/${thumbPath}${featuredPath}`;
    const { length, [length - 1]: rawFileName } = sourceUrl.split('/');
    const [fileName, originalExtension] = rawFileName.split('.');

    const jpg = `${newPath}${fileName}.${originalExtension}`;
    const webp = `${newPath}${fileName}.webp`;
    const blur =
      blurImageCache[`public${newPath}${fileName}.${originalExtension}`];

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

  return {
    title,
    openGraph: {
      images: [shareImage],
    },
    other: {
      image: `${metadataBase.toString().replace(/\/$/, '')}${shareImage}`,
    },
    alternates: {
      canonical: slug,
    },
  };
};
