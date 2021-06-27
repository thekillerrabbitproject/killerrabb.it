import React, { useEffect, useState } from 'react';
import { withPrefix } from 'gatsby';
import { share } from '@css/misc';

const shareIcon = withPrefix('icons/share.svg');

const Share = () => {
  const [hasShare, setHasShare] = useState(false);
  useEffect(() => {
    if (navigator.share) {
      setHasShare(true);
    }
  }, []);
  const onClick = (event) => {
    event.preventDefault();
    if (hasShare) {
      navigator
        .share({
          url: window.location.href,
        })
        .then(() => {
          console.log('shared');
        })
        .catch((e) => console.log(e));
    }
  };
  return hasShare ? (
    <a href="#" onClick={onClick}>
      <img src={shareIcon} css={share} alt="Share" width="24" height="24" />
    </a>
  ) : (
    <></>
  );
};

export default Share;
