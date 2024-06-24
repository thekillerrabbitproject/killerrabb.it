import styles from '@/css/MetaComponent.module.css';
import { meta } from '@/types/index';
import { getFilmString } from '@/utils';

import { Link } from 'next-view-transitions';

const Meta = ({ data, showTitle = false, notSticky = false }) => (
  <div
    className={`${styles.meta} ${getFilmString(data, styles)} ${
      notSticky && styles.metaNotSticky
    }`}
  >
    <div className={styles.metaSlider}>
      {showTitle && (
        <h2 className={styles.header}>
          <Link href={data.uri} title={data.title} className={styles.link}>
            {data.title}
          </Link>
        </h2>
      )}
      <p className={styles.paragraph}>meta</p>
      <ul className={styles.list}>
        {data.films.nodes.map((film) => (
          <li key={film.uri} className={styles.listItem}>
            <Link href={film.uri} title={film.name} className={styles.link}>
              {film.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className={styles.list}>
        {data.models.nodes.map((model) => (
          <li key={model.uri} className={styles.listItem}>
            <Link href={model.uri} title={model.name} className={styles.link}>
              {model.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

Meta.propTypes = meta;

export default Meta;
