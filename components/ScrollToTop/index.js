'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.css';
import { RiArrowUpSLine } from 'react-icons/ri';

export default function ScrollToTop() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    let scrolled = window.scrollY;
    if (scrolled > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={clsx(styles.scrollToTop, { [styles.active]: isScrolled })}
      onClick={handleClick}
    >
      <RiArrowUpSLine />
    </button>
  );
}
