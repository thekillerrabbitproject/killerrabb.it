import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

const SEO = ({ title }) => {
  return (
    <Helmet
      titleTemplate="%s | The Killer-Rabbit Photography"
      defaultTitle="The Killer-Rabbit Photography"
    >
      <title>{title}</title>
      <meta
        name="description"
        content="Analog photography made by Pedro Costa Neves"
      />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
};

export default SEO;
