'use client';
import { useEffect, useState } from 'react';

import styles from '@/css/Slides/Arrows.module.css';
import { arrows } from '@/types';

import 'scrollyfills';
import smoothscroll from 'smoothscroll-polyfill';

if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
}

const Arrows = ({ carouselRef }) => {
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const hasNoArrows = prevDisabled && nextDisabled;

  const onClickHandler = (direction) => (event) => {
    event.preventDefault();
    const track = carouselRef.current;

    if (direction === 'prev') {
      setNextDisabled(false);
      track.scrollTo({
        left: track.scrollLeft - track.firstElementChild.offsetWidth,
        behavior: 'smooth',
      });
    }

    if (direction === 'next') {
      setPrevDisabled(false);
      track.scrollTo({
        left: track.scrollLeft + track.firstElementChild.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollEventListener = () => {
    const track = carouselRef.current;
    const trackScrollWidth = track.scrollWidth;
    const trackOuterWidth = track.clientWidth;

    setPrevDisabled(false);
    setNextDisabled(false);

    if (track.scrollLeft <= 0) {
      setPrevDisabled(true);
    }

    if (track.scrollLeft >= trackScrollWidth - trackOuterWidth) {
      setNextDisabled(true);
    }
  };

  useEffect(() => {
    const track = carouselRef.current;
    // run one time to prevent arrows being enabled on large screens
    handleScrollEventListener();
    track.addEventListener('scrollend', handleScrollEventListener);

    return () => {
      track.removeEventListener('scrollend', handleScrollEventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselRef]);

  return (
    !hasNoArrows && (
      <div className={styles.arrows}>
        <button
          className={styles.button}
          title="Previous"
          disabled={prevDisabled}
          onClick={onClickHandler('prev')}
        >
          ◄◄
        </button>
        <button
          className={styles.button}
          title="Next"
          disabled={nextDisabled}
          onClick={onClickHandler('next')}
        >
          ►►
        </button>
      </div>
    )
  );
};

Arrows.propTypes = arrows;

export default Arrows;
