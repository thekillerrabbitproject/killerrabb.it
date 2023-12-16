import React from 'react';
import Share from '@components/Share';
import { title } from '@types/index';

import * as ß from './styles';

const Title = ({ title, isVideo, hasShare }) =>
  title && (
    <header css={ß.header}>
      <h2 css={ß.title} className={isVideo ? 'video' : 'post'}>
        {title}
      </h2>
      {hasShare && <Share />}
    </header>
  );

Title.propTypes = title;

Title.defaultProps = {
  hasShare: false,
  isVideo: false,
};

export default Title;
