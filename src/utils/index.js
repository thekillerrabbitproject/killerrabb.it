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
