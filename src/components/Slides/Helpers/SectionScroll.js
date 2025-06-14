'use client';
import { useRef } from 'react';

import styles from '@/css/Slides/SectionScroll.module.css';
import { sectionScroll } from '@/types';

import Arrows from './Arrows';
import ArrowsPostSlider from './ArrowsPostSlider';

const SectionScroll = ({ children, className, scrollBySingle = false }) => {
  const ref = useRef();

  return (
    <div className={styles.sectionScroll}>
      <section className={className} ref={ref}>
        {children}
      </section>
      {scrollBySingle ? (
        <ArrowsPostSlider carouselRef={ref} />
      ) : (
        <Arrows carouselRef={ref} />
      )}
    </div>
  );
};

SectionScroll.propTypes = sectionScroll;

export default SectionScroll;
