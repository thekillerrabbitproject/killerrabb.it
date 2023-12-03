import React from 'react';
import { title } from '@types';

import * as ß from './styles';

const Title = ({ title, isVideo }) =>
  title && (
    <h2 css={ß.title} className={isVideo ? 'video' : 'post'}>
      {title}
    </h2>
  );

Title.propTypes = title;

Title.defaultProps = {
  isVideo: false,
};

export default Title;
