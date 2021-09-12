import { getImage } from 'gatsby-plugin-image';
export const getWebp = (image) => {
  const localImage = getImage(image);
  const { length, [length - 1]: last } =
    localImage?.images?.sources?.[0].srcSet.split(',');
  return last.split(' ')?.[0].trim();
};
