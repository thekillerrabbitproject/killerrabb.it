const getNodeImage = (node) => node.featuredImage.node.localFile.shareImage;

export const isDuplicatedFromGallery = (content) => {
  const {
    featuredImageId,
    acf: { gallery },
  } = content;

  return !!gallery.some(({ id }) => id === featuredImageId);
};

export const getFilmString = (content) => {
  const {
    films: { nodes },
  } = content;

  return nodes.map((film) => film.slug).join(' ');
};

export const getFirstModelImage = (data) => {
  const {
    wpModel: { videos, posts },
  } = data;

  if (videos?.nodes.length > 0) {
    return getNodeImage(videos.nodes.at(0));
  }

  return getNodeImage(posts.nodes.at(0));
};
