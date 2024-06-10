import styles from '@/css/MenuComponent.module.css';
import useSiteMetadata from '@/hooks/useSiteMetadata';

import Link from 'next/link';

const Menu = () => {
  const { menu } = useSiteMetadata();

  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        {menu.map((item) => (
          <li id={item.id} key={item.id}>
            <Link href={item.path} className={styles.link}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
