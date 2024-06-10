import styles from '@/css/Footer.module.css';
import { query } from '@/graphql/Footer';
import useSiteMetadata from '@/hooks/useSiteMetadata';
import client from '@/utils/apollo-client';

import Link from 'next/link';

async function getData() {
  try {
    const res = await client.query({
      query,
    });

    const {
      films: { nodes: filmNodes },
      models: { nodes: modelsNodes },
    } = res?.data;

    return {
      films: filmNodes,
      models: modelsNodes,
    };
  } catch (error) {
    console.error(error);
  }
}

const Footer = async () => {
  const { menu } = useSiteMetadata();
  const { films, models } = await getData();

  return (
    <footer className={styles.footer}>
      <ul className={styles.list}>
        <li className={styles.listItemHeader}>menu</li>
        {menu.map((item) => (
          <li key={item.id} className={styles.listItem}>
            <Link href={item.path} title={item.name}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className={styles.list}>
        <li className={styles.listItemHeader}>films</li>
        {films?.map(
          (film) =>
            film?.count && (
              <li key={film.uri} className={styles.listItem}>
                <Link href={film.uri} title={film.name}>
                  {film.name}
                </Link>
              </li>
            ),
        )}
      </ul>
      <ul className={styles.list}>
        <li className={styles.listItemHeader}>models</li>
        {models?.map(
          (model) =>
            model?.count && (
              <li key={model.uri} className={styles.listItem}>
                <Link href={model.uri} title={model.name}>
                  {model.name}
                </Link>
              </li>
            ),
        )}
      </ul>
    </footer>
  );
};

export default Footer;
