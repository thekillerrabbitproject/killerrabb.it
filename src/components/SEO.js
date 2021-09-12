import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

const SEO = ({ title, cardImage }) => {
  const { site } = useStaticQuery(query);
  const siteUrl = site?.siteMetadata?.siteUrl;
  const shareService = 'https://tkrp.net/share/index.php';
  return (
    <Helmet
      titleTemplate="%s | The Killer-Rabbit Photography"
      defaultTitle="The Killer-Rabbit Photography"
      htmlAttributes={{
        lang: 'en',
      }}
    >
      <title>{title}</title>
      <meta
        name="description"
        content="Analog photography made by Pedro Costa Neves"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@persocon" />
      <meta name="twitter:creator" content="@persocon" />
      <meta
        name="twitter:title"
        content={title ?? 'The Killer-Rabbit Photography'}
      />
      <meta
        name="og:title"
        content={title ?? 'The Killer-Rabbit Photography'}
      />
      <meta
        name="twitter:image"
        content={`${shareService}?image=${siteUrl}${cardImage}`}
      />
      <meta
        name="og:image"
        content={`${shareService}?image=${siteUrl}${cardImage}`}
      />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  cardImage: PropTypes.string,
};

export default SEO;
