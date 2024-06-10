const blackAndWhiteNegativeText = '#FFFFFF';
const colorNegativeText = '#e8850d';
const highlight = '#facacf';

const categories = new Map([
  ['color', colorNegativeText],
  ['black-white', blackAndWhiteNegativeText],
]);

const getCategoryColor = (category) => categories.get(category) ?? highlight;

const findCategory = (categories, category) =>
  categories.find((x) => x.slug === category);

const getColorByCategory = (categories) => {
  let category = 'highlight';
  const isColor = findCategory(categories, 'color');
  const isBlackAndWhite = findCategory(categories, 'black-white');

  if (isColor) {
    category = 'color';
  }

  if (isBlackAndWhite) {
    category = 'black-white';
  }

  return getCategoryColor(category).replaceAll('#', '');
};

const shareService = ({
  title = '',
  image,
  postType = 'post',
  categories = [],
}) => {
  const shareApi = 'https://tkrp.net/share/index.php';

  const categoryColor = getColorByCategory(categories);
  const satanizedTitle = encodeURIComponent(title);

  if (image) {
    const queryString = `?image=${image}&text=${satanizedTitle}&type=${postType}&color=${categoryColor}`;

    return `${shareApi}${queryString}`;
  }
};

export default shareService;
