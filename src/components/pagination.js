import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';

import * as ß from '../emotion/nav';

const Pagination = props => {
  const { prevPath, nextPath, currentPage, numPages } = props;
  return (
    <nav css={ß.nav}>
      {prevPath ? (
        <Link to={prevPath} css={ß.navItemPrev}>
          Previous
        </Link>
      ) : null}
      <span css={ß.span}>
        {currentPage} / {numPages}
      </span>
      {nextPath ? (
        <Link direction="left" to={nextPath} css={ß.navItemNext}>
          Next
        </Link>
      ) : null}
    </nav>
  );
};

Pagination.propTypes = {
  prevPath: PropTypes.string,
  nextPath: PropTypes.string,
  currentPage: PropTypes.number,
  numPages: PropTypes.number,
};

export default Pagination;
