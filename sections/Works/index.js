'use client';
import { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Section from '@/components/Section';
import clsx from 'clsx';
import styles from './index.module.css';
import { RiArrowRightLine } from 'react-icons/ri';
import WorkCard from '@/components/WorkCard';
import PreviewModal from '@/components/PreviewModal';
import { LangContext } from '@/providers/lang';

export default function Works({ data }) {
  let { lang } = useContext(LangContext);

  const langObj = {
    heading: {
      tw: '作品',
      cn: '作品',
      en: 'works',
    },
    intro: {
      tw: '在這裡，您可以探索我閒暇之餘做的作品，或曾經為客戶（經過同意公開）創建的精彩網站和專案。這些作品展示了我的專業技能和創造力。',
      cn: '在这里，您可以探索我闲暇之余做的作品，或曾经为客户（经过同意公开）创建的精彩网站和专案。这些作品展示了我的专业技能和创造力。',
      en: 'Here, you can explore the works I have done in my spare time or the wonderful websites and projects I have created for clients (publicly available with consent). These works showcase my professional skills and creativity.',
    },
    more: {
      tw: '查看更多',
      cn: '查看更多',
      en: 'View more',
    },
  };

  const filterObj = [
    {
      order: 1,
      content: {
        tw: '全部',
        cn: '全部',
        en: 'All',
      },
      value: 'all',
    },
    {
      order: 2,
      content: {
        tw: '網頁',
        cn: '网页',
        en: 'Web',
      },
      value: 'web',
    },
    {
      order: 3,
      content: {
        tw: 'UI/UX',
        cn: 'UI/UX',
        en: 'UI/UX',
      },
      value: 'uiux',
    },
  ];

  const [filter, setFilter] = useState('all');

  const handleFilter = (event) => {
    const filter = event.target.dataset.filter;
    setFilter(filter);
  };

  const [worksData, setWorksData] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [previewTitle, setPreviewTitle] = useState(null);

  useEffect(() => {
    let count = 0;
    const tempArr = [];
    data.forEach((item, index) => {
      if (count >= 10) return;
      const tagArr = [];
      let tempTag = JSON.parse(item.tags);
      tempTag.forEach((tag) => {
        tagArr.push(tag);
      });
      if (filter === 'all' || item.type === filter) {
        count++;
        tempArr.push({
          order: item._id,
          type: item.type,
          title: {
            tw: item.title.tw,
            cn: item.title.cn,
            en: item.title.en,
          },
          content: {
            tw: item.content.tw,
            cn: item.content.cn,
            en: item.content.en,
          },
          tags: tagArr,
          cover: item.cover,
          link: {
            github: item.link.github,
            blog: item.link.blog,
            demo: item.link.demo,
            preview: item.link.preview === 'preview' ? item.cover : undefined,
          },
        });
      }
    });
    setWorksData(tempArr);
  }, [data, filter]);

  const handlePreview = (event) => {
    const img = event.target.dataset.src;
    const title = event.target.dataset.title;
    setPreviewSrc(img);
    setPreviewTitle(title);
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  return (
    <>
      <Section
        id="works"
        heading={langObj.heading[lang]}
        intro={langObj.intro[lang]}
      >
        <div className={styles.filterContainer}>
          <ul>
            {filterObj.map((item) => {
              return (
                <li
                  key={item.order}
                  data-filter={item.value}
                  onClick={handleFilter}
                  className={clsx({
                    [styles.active]: item.value === filter,
                  })}
                >
                  {item.content[lang]}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.works}>
          {worksData.map((work) => {
            return (
              <WorkCard
                key={work.order}
                type={work.type}
                title={work.title[lang]}
                content={work.content[lang]}
                tags={work.tags}
                cover={work.cover}
                link={work.link}
                lang={lang}
                handlePreview={handlePreview}
              />
            );
          })}
        </div>
        <div className={styles.action}>
          <Link className={styles.more} href="/works">
            {langObj.more[lang]}
            <RiArrowRightLine />
          </Link>
        </div>
      </Section>
      {modalShow &&
        createPortal(
          <PreviewModal
            src={previewSrc}
            title={previewTitle}
            lang={lang}
            handleModalClose={handleModalClose}
          />,
          document.body
        )}
    </>
  );
}
