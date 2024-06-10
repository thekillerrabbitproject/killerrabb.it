import Menu from '@/components/Menu';
import styles from '@/css/HeaderComponent.module.css';
import useSiteMetadata from '@/hooks/useSiteMetadata';

const Header = () => {
  const { title } = useSiteMetadata();

  return (
    <header className={styles.header}>
      <h1 className={styles.title} data-title={title}>
        {title}
      </h1>
      <Menu />
    </header>
  );
};

export default Header;
