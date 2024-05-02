import React from 'react';
import useSiteMetadata from '@hooks/useSiteMetadata';
import { seo } from '@types/index';

import { shareService } from './utils';

const SEO = ({
  title,
  description,
  pathname,
  image,
  children,
  postType,
  categories,
  video,
}) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    shareImage: defaultImage,
    siteUrl,
    twitterUsername,
  } = useSiteMetadata();

  const realTitle = title?.length ? `${title} | ${defaultTitle}` : defaultTitle;

  const seo = {
    title: realTitle,
    description: description || defaultDescription,
    image: image || `${siteUrl}${defaultImage}`,
    url: `${siteUrl}${pathname || ''}`,
    twitterUsername,
    shareImage: image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`,
  };

  const shareImage = shareService({
    title,
    image: seo.shareImage,
    postType,
    categories,
  });

  return (
    <>
      <title>{seo.title}</title>
      <link rel="canonical" href={seo.url} />
      <meta name="description" content={seo.description} />
      <meta name="image" content={shareImage} />

      {video && (
        <meta name="og:video" content={`https://killerrabb.it${video}`} />
      )}
      <meta name="og:title" content={seo.title} />
      <meta name="og:image" content={shareImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={shareImage} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      {children}
    </>
  );
};

SEO.propTypes = seo;

SEO.defaultProps = {
  categories: [],
  postType: 'post',
  title: '',
};

export default SEO;
