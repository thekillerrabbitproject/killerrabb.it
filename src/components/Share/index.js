'use client';
import React, { useEffect, useState } from 'react';

import styles from '@/css/icon.module.css';

import Image from 'next/image';

const Share = () => {
  const [hasShare, setHasShare] = useState(false);

  useEffect(() => {
    if (navigator.share) {
      setHasShare(true);
    }
  }, []);

  const onClick = (event) => {
    event.preventDefault();
    const { log } = console;

    if (hasShare) {
      navigator
        .share({
          url: window.location.href,
        })
        .then(() => {
          log('shared');
        })
        .catch((error) => log(error));
    }
  };

  return (
    hasShare && (
      <a href="#" onClick={onClick}>
        <Image
          src="icons/share.svg"
          unoptimized
          width="24"
          height="24"
          alt="Share"
          className={styles.icon}
        />
      </a>
    )
  );
};

export default Share;
