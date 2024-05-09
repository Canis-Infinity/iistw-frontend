import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Modal from '@/components/Modal';
import Loading from '@/components/Loading';
import styles from './index.module.css';

export default function PreviewModal({
  lang,
  handleModalClose,
  src,
  title,
}) {
  const translationObj = {
    tw: '預覽',
    cn: '预览',
    en: 'Preview',
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!modalRef.current?.contains(event.target)) {
        handleModalClose();
      }
    };

    window.addEventListener('mousedown', handleOutSideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutSideClick);
    };
  });

  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Modal
      size="large"
      title={translationObj[lang]}
      close={handleModalClose}
    >
      <div className={styles.preview}>
        {loading && <Loading type="secondary" />}
        <Image src={src} width={480} height={270} alt={title} onLoad={handleImageLoad} />
      </div>
    </Modal>
  );
}
