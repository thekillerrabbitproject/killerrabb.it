import React from 'react';
import { content } from '@types';

import * as ß from './styles';

const Content = ({ content }) =>
  content && (
    <article css={ß.content} dangerouslySetInnerHTML={{ __html: content }} />
  );

Content.propTypes = content;

export default Content;
