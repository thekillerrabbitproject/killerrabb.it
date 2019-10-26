import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { pathOr } from 'ramda';

const ShareButton = props => {
  const slugPath = pathOr(false, ['slugPath'], props);
  const title = pathOr(false, ['title'], props);
  const data = useStaticQuery(graphql`
    query QueryShareButton {
      shareIcon: file(relativePath: { eq: "share-icon.png" }) {
        childImageSharp {
          fixed(quality: 100, width: 20) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `);
  const share = pathOr(
    'Share',
    ['shareIcon', 'childImageSharp', 'fixed'],
    data
  );
  const getShareIcon = () => {
    if (typeof share === 'object') {
      return <Img fixed={share} />;
    }
    return share;
  };
  const getButton = () => {
    if (typeof window !== `undefined` && slugPath && title) {
      const shareAction = pathOr(false, ['navigator', 'share'], window);
      if (shareAction) {
        return (
          <a
            href={`/${slugPath}`}
            className="share"
            onClick={e => {
              e.preventDefault();
              navigator
                .share({
                  title: title,
                  text: title,
                  url: `/${slugPath}`,
                })
                .catch(error => error); //silence catch
            }}
          >
            {getShareIcon()}
          </a>
        );
      }
      return null;
    }
    return null;
  };

  return getButton();
};

export default ShareButton;
