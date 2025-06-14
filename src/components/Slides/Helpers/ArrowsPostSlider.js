'use client';
import { useEffect, useState } from 'react';

import styles from '@/css/Slides/Arrows.module.css';
import { arrowsPostSlider } from '@/types';

import 'scrollyfills';
import scrollIntoView from 'scroll-into-view-if-needed';

function isElementVisible(element, container) {
  const elRect = element.getBoundingClientRect();
  const conRect = container.getBoundingClientRect();

  let result = false;

  if (
    elRect.x >= conRect.x &&
    elRect.y >= conRect.y &&
    elRect.x + elRect.width <= conRect.x + conRect.width &&
    elRect.y + elRect.height <= conRect.y + conRect.height
  ) {
    result = true;
  }

  return result;
}

const ArrowsPostSlider = ({ carouselRef }) => {
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [index, setIndex] = useState(0);

  const whoIsVisible = () => {
    const track = carouselRef.current;
    const children = [...track.children];

    return children.map((el) => isElementVisible(el, track));
  };

  const onClickHandler = (direction) => (event) => {
    event.preventDefault();
    const track = carouselRef.current;
    const children = [...track.children];

    if (direction === 'prev') {
      const prevIndex = index - 1;
      const el = document.querySelector(
        `[class*="${children.at(prevIndex).className}"]:nth-child(${index})`,
      );
      scrollIntoView(el, {
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }

    if (direction === 'next') {
      const nextIndex = index + 1;
      const el = document.querySelector(
        `[class*="${children.at(nextIndex).className}"]:nth-child(${nextIndex + 1})`,
      );
      scrollIntoView(el, {
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  const handleDisablingArrows = () => {
    const track = carouselRef.current;
    const children = [...track.children];

    setPrevDisabled(index === 0);

    setNextDisabled(index + 1 === children.length);
  };

  const handleFixIndex = () => {
    const track = carouselRef.current;
    const trackScrollWidth = track.scrollWidth;
    const trackOuterWidth = track.clientWidth;

    const visibleChildrenIndex = whoIsVisible().reduce(
      (accumulator, currentValue, currentIndex) => {
        if (currentValue) {
          accumulator.push(currentIndex);
        }

        return accumulator;
      },
      [],
    );

    const {
      length,
      [0]: first = 0,
      [length - 1]: last = 0,
    } = visibleChildrenIndex;

    if (track.scrollLeft <= 0) {
      return setIndex(0);
    }

    if (track.scrollLeft >= trackScrollWidth - trackOuterWidth) {
      return setIndex(last);
    }

    if (length > 0) {
      setIndex(first);
    }
  };

  useEffect(() => {
    handleDisablingArrows();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    const track = carouselRef.current;
    track.addEventListener('scrollend', handleFixIndex);

    return () => {
      track.removeEventListener('scrollend', handleFixIndex);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselRef]);

  return (
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
  );
};

ArrowsPostSlider.propTypes = arrowsPostSlider;

export default ArrowsPostSlider;
