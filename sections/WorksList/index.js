'use client';
import { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import WorkCard from '@/components/WorkCard';
import PreviewModal from '@/components/PreviewModal';
import { LangContext } from '@/providers/lang';
import { workFilters } from '@/utils/i18n';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Works({ data }) {
  let { lang } = useContext(LangContext);

  const [filter, setFilter] = useState('all');

  const [worksData, setWorksData] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [previewTitle, setPreviewTitle] = useState(null);

  useEffect(() => {
    const tempArr = [];
    data.forEach((item, index) => {
      const tagArr = [];
      let tempTag = JSON.parse(item.tags);
      tempTag.forEach((tag) => {
        tagArr.push(tag);
      });
      if (filter === 'all' || item.type === filter) {
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
    <section className="relative isolate w-full px-6 py-24 md:px-10 md:py-28 lg:px-16">
      <div className="mx-auto w-full max-w-[1200px]">
      <div className="mb-8 flex w-full justify-center">
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList variant="line">
          {workFilters.map((item) => {
            return (
              <TabsTrigger
                key={item.order}
                value={item.value}
                className="px-4"
              >
                {item.content[lang]}
              </TabsTrigger>
            );
          })}
          </TabsList>
        </Tabs>
      </div>
      <div className="flex w-full flex-col gap-12 md:gap-6">
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
      </div>
    </section>
  );
}
