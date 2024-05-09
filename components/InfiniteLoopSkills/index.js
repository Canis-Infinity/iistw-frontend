import { useEffect, useState } from 'react';
import styles from './index.module.css';

const rows = 5;
const duration = 50000;

const Tag = ({ icon, content }) => {
  return (
    <div className={styles.tag}>
      {icon}
      {content}
    </div>
  );
};

const Slider = ({ children, reverse }) => {
  return (
    <div
      className={styles.loopSlider}
      style={{
        '--duration': `${
          Math.floor(Math.random() * (duration + 5000 - (duration - 5000))) +
          (duration - 5000)
        }ms`,
        '--direction': reverse ? 'reverse' : 'normal',
      }}
      suppressHydrationWarning
    >
      <div className={styles.inner}>
        {children}
        {children}
      </div>
    </div>
  );
};

const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

export default function InfiniteLoopSkills({ skillsObj, currentLang }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const tempArr = [];
    for (let i = 0; i < rows; i++) {
      const shuffleTags = shuffle(skillsObj);
      tempArr.push(shuffleTags);
    }
    setTags(tempArr);
  }, [skillsObj]);

  return (
    <div className={styles.tagList} data-desktop>
      {tags.map((item, index) => (
        <Slider key={index} reverse={index % 2}>
          {item.map((tag) => (
            <Tag
              key={tag.order}
              icon={tag.icon}
              content={tag.content[currentLang]}
            />
          ))}
        </Slider>
      ))}
      <div className={styles.fade}></div>
    </div>
  );
}
