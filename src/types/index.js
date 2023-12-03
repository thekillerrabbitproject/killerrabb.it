import PropTypes from 'prop-types';

export const dataAny = { data: PropTypes.object.isRequired };

export const children = { children: PropTypes.node.isRequired };

export const seo = {
  title: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node,
};

export const slidePostsImage = {
  image: PropTypes.object,
  isFeatured: PropTypes.bool,
};

export const content = {
  content: PropTypes.string,
};

export const title = {
  title: PropTypes.string,
  isVideo: PropTypes.bool,
};

export const sliders = {
  ...dataAny,
  title: PropTypes.string,
  disableSlider: PropTypes.bool,
};

export const video = {
  title: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  cover: PropTypes.object.isRequired,
};
