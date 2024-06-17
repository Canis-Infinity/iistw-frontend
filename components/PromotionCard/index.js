import { useState } from 'react';
import Image from 'next/image';
import Loading from '@/components/Loading';
import styles from './index.module.css';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { SiShopee } from 'react-icons/si';
import { IoLink } from 'react-icons/io5';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function PromotionCard({ lang, title, content, link, logo }) {
  const translationObj = {
    shopee: {
      tw: '點擊前往蝦皮商城',
      cn: '点击前往蝦皮商城',
      en: 'Click to go to Shopee',
    },
    normal: {
      tw: '點擊開啓網站',
      cn: '点击开启网站',
      en: 'Click to open website',
    },
  };

  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        {!logo && <RiDiscountPercentFill />}
        {logo && loading && <Loading />}
        {logo && (
          <Image
            src={`${process.env.baseUrl}${logo}`}
            alt={title}
            width={100}
            height={100}
            onLoad={handleImageLoad}
          />
        )}
      </div>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{content}</p>
        <div className={styles.actions}>
          {link?.shopee && (
            <>
              <Tippy content={translationObj.shopee[lang]} placement="auto">
                <a
                  className={styles.action}
                  href={link.shopee}
                  target="_blank"
                  data-desktop
                >
                  <SiShopee />
                </a>
              </Tippy>
              <a
                className={styles.action}
                href={link.shopee}
                target="_blank"
                data-mobile
              >
                <SiShopee />
              </a>
            </>
          )}
          {link?.normal && (
            <>
              <Tippy content={translationObj.normal[lang]} placement="auto">
                <a
                  className={styles.action}
                  href={link.normal}
                  target="_blank"
                  data-desktop
                >
                  <IoLink />
                </a>
              </Tippy>
              <a
                className={styles.action}
                href={link.normal}
                target="_blank"
                data-mobile
              >
                <IoLink />
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
