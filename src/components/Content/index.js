import styles from '@/css/ContentComponent.module.css';
import { content } from '@/types';

const Content = ({ content }) =>
  content && (
    <article
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );

Content.propTypes = content;

export default Content;
