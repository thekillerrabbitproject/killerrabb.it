import { graphql, useStaticQuery } from 'gatsby';

const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query SEOSiteMetadata {
      site {
        siteMetadata {
          title
          description
          siteUrl
          twitterUsername
          image
          shareImage
          menu {
            id
            path
            name
          }
        }
      }
    }
  `);

  return data.site.siteMetadata;
};

export default useSiteMetadata;
