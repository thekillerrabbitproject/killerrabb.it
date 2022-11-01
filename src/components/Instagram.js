import React from 'react';
import { withPrefix } from 'gatsby';

const icon = withPrefix('icons/instagram.svg');

const Instagram = () => {
  return (
    <a
      href="https://www.instagram.com/persocon"
      target="_blank"
      rel="nofollow noreferrer"
    >
      <img src={icon} alt="Instagram" width="20" height="20" />
      @persocon
    </a>
  );
};

export default Instagram;
