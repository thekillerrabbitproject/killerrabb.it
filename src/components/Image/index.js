import Link from 'next/link';
import styles from '@/css/ImageComponent.module.css';
import { children, slidePostsImage } from '@/types/index';

const LinkWrapper = ({ href, title, children }) => {
  if (href) {
    return (
      <Link href={href} title={title}>
        {children}
      </Link>
    );
  }

  return children;
};

LinkWrapper.propTypes = {
  href: slidePostsImage.uri,
  title: slidePostsImage.alt,
  children,
};

const Image = ({
  alt,
  uri,
  jpg,
  webp,
  width,
  height,
  isFeatured = false,
  cssOverride,
  className,
}) => {
  const featuredClassName = isFeatured ? 'featured' : 'image';

  return (
    <div
      className={`${styles.imageWrapper} ${featuredClassName} ${className}`}
      style={{
        '--width': cssOverride?.width || `${width}px`,
        '--height': cssOverride?.height || `${height}px`,
      }}
    >
      <LinkWrapper href={uri} title={alt}>
        <picture>
          {webp && (
            <source
              srcSet={`${webp} 1x,  ${webp} 2x`}
              type="image/webp"
              width={width}
              height={height}
            />
          )}
          <img
            alt={alt}
            fetchPriority="high"
            width={width}
            height={height}
            decoding="async"
            loading="lazy"
            srcSet={`${jpg} 1x, ${jpg} 2x`}
            src={jpg}
          />
        </picture>
      </LinkWrapper>
    </div>
  );
};

Image.propTypes = {
  ...slidePostsImage,
};

export default Image;
