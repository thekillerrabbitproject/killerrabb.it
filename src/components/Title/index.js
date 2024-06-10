import Share from '@/components/Share';
import styles from '@/css/TitleComponent.module.css';
import { title } from '@/types/index';

const Title = ({ title, isVideo = false, hasShare = false }) =>
  title && (
    <header className={styles.header}>
      <h2 className={`${styles.title} ${isVideo && styles.video}`}>{title}</h2>
      {hasShare && <Share />}
    </header>
  );

Title.propTypes = title;

export default Title;
