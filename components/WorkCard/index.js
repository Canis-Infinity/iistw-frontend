import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import styles from './index.module.css';
import { IoLogoGithub, IoLink, IoEye } from 'react-icons/io5';
import { TbArticleFilled } from 'react-icons/tb';
import { ImSpinner8 } from 'react-icons/im';

const Loading = ({ content }) => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}>
        <ImSpinner8 />
      </div>
      <div>{content}</div>
    </div>
  );
};

export default function WordCard({
  type,
  title,
  content,
  tags,
  cover,
  link,
  lang,
  handlePreview,
}) {
  const { github, preview, blog, demo } = link;

  const translationObj = {
    github: {
      tw: '點擊前往 GitHub',
      cn: '点击前往 GitHub',
      en: 'Click to go to GitHub',
    },
    blog: {
      tw: '點擊開啓 Blog 網站',
      cn: '点击开启 Blog 网站',
      en: 'Click to open blog website',
    },
    demo: {
      tw: '點擊開啓 Demo 網站',
      cn: '点击开启 Demo 网站',
      en: 'Click to open demo website',
    },
    preview: {
      tw: '點擊預覽',
      cn: '点击预览',
      en: 'Click to preview',
    },
    loading: {
      tw: '圖片載入中...',
      cn: '图片载入中...',
      en: 'Loading...',
    },
  };

  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cover}>
        {loading && <Loading />}
        <Image src={`${process.env.baseUrl}${cover}`} alt={title} width={320} height={180} onLoad={handleImageLoad} />
      </div>
      <div className={styles.wrapper}>
        <h3>{title}</h3>
        <p className={clsx({ [styles.alignLeft]: lang === 'en' })}>
          {content}
        </p>
        <div className={styles.tags}>
          {tags.map((tag) => {
            return (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            );
          })}
        </div>
        <div className={styles.actions}>
          {github && (
            <>
              <a className={styles.action} href={github} target="_blank">
                <IoLogoGithub />{translationObj.github[lang]}
              </a>
            </>
          )}
          {blog && (
            <>
              <a className={styles.action} href={blog} target="_blank">
                <TbArticleFilled />{translationObj.blog[lang]}
              </a>
            </>
          )}
          {demo && (
            <>
              <a className={styles.action} href={demo} target="_blank">
                <IoLink />{translationObj.demo[lang]}
              </a>
            </>
          )}
          {preview && (
            <>
              <button
                className={styles.action}
                data-src={`${process.env.baseUrl}${preview}`}
                data-title={title}
                onClick={handlePreview}
              >
                <IoEye />{translationObj.preview[lang]}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
