import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Modal from '@/components/Modal';
import Loading from '@/components/Loading';
import { translations, pickLang } from '@/utils/i18n';

export default function PreviewModal({
  lang,
  handleModalClose,
  src,
  title,
}) {
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
      title={pickLang(translations.common.preview, lang)}
      close={handleModalClose}
    >
      <div className="relative flex min-h-72 w-full items-center justify-center overflow-hidden rounded-lg bg-muted">
        {loading && <Loading type="secondary" />}
        <Image
          className="h-auto w-full rounded-lg object-contain"
          src={src}
          width={960}
          height={540}
          alt={title}
          onLoad={handleImageLoad}
        />
      </div>
    </Modal>
  );
}
