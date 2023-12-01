import React from 'react';
import { dataAny } from '@types/index';

import * as ß from './styles';
import { getFilmString } from './utils';

import { Link } from 'gatsby';

const Meta = ({ data }) => (
  <div css={ß.meta} className={getFilmString(data)}>
    <div css={ß.metaSlider}>
      <h2>
        <Link to={data.path} title={data.title}>
          {data.title}
        </Link>
      </h2>
      <p>meta</p>
      <ul>
        {data.films.nodes.map((film) => (
          <li key={film.path}>
            <Link to={film.path} title={film.name}>
              {film.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        {data.models.nodes.map((model) => (
          <li key={model.path}>
            <Link to={model.path} title={model.name}>
              {model.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

Meta.propTypes = dataAny;

export default Meta;
