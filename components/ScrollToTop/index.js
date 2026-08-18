'use client';
import { useEffect, useState } from 'react';
import { RiArrowUpSLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    <Button
      type="button"
      size="icon-lg"
      variant="outline"
      className={cn(
        'fixed bottom-6 right-6 z-40 rounded-full transition-opacity',
        isScrolled ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
      onClick={handleClick}
    >
      <RiArrowUpSLine />
    </Button>
  );
}
