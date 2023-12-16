import React, { useEffect, useState } from 'react';

import { withPrefix } from 'gatsby';

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
    const { log } = console;

    if (hasShare) {
      navigator
        .share({
          url: window.location.href,
        })
        .then(() => {
          log('shared');
        })
        .catch((error) => log(error));
    }
  };

  return (
    hasShare && (
      <a href="#" onClick={onClick}>
        <img
          className="icon"
          src={shareIcon}
          alt="Share"
          width="24"
          height="24"
        />
      </a>
    )
  );
};

export default Share;
