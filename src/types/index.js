import PropTypes from 'prop-types';

export const dataAny = { data: PropTypes.object.isRequired };

export const children = { children: PropTypes.node.isRequired };

export const seo = {
  title: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node,
  postType: PropTypes.string,
  categories: PropTypes.array,
};

export const slidePostsImage = {
  sourceUrl: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  isFeatured: PropTypes.bool,
  alt: PropTypes.string.isRequired,
  uri: PropTypes.string,
  cssOverride: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  className: PropTypes.string,
};

export const content = {
  content: PropTypes.string,
};

export const title = {
  title: PropTypes.string,
  isVideo: PropTypes.bool,
  hasShare: PropTypes.bool,
};

export const sliders = {
  title: PropTypes.string,
  disableSlider: PropTypes.bool,
};

export const video = {
  title: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  cover: PropTypes.object.isRequired,
};

export const meta = {
  ...dataAny,
  showTitle: PropTypes.bool,
  notSticky: PropTypes.bool,
};

export const sectionScroll = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const arrows = {
  carouselRef: PropTypes.shape({
    current: PropTypes.shape({
      scrollLeft: PropTypes.number,
      scrollWidth: PropTypes.number,
      clientWidth: PropTypes.number,
      firstElementChild: PropTypes.shape({
        offsetWidth: PropTypes.number,
      }),
      addEventListener: PropTypes.func,
      removeEventListener: PropTypes.func,
    }),
  }),
};
export const arrowsPostSlider = {
  carouselRef: PropTypes.shape({
    current: PropTypes.shape({
      children: PropTypes.node,
    }),
  }),
};
