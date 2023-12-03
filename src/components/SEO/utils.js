export const shareService = ({ title = '', image }) => {
  const shareApi = 'https://tkrp.net/share/index.php';

  if (image) {
    const queryString = `?image=${image}&text=${title}`;

    return `${shareApi}${queryString}`;
  }
};
