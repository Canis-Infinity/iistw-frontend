import styles from './index.module.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function SocialMedias({ data, mediaIcons, mediaContents, lang }) {
  return (
    <div className={styles.socialMedias}>
      {data?.map((item) => {
        const content = item.title === 'mobile' ? `tel:+886${item.content.replace('0', '')}` : item.title === 'email' ? `mailto:${item.content}` : item.content
        return (
          <Tippy
            content={mediaContents[item.title][lang]}
            placement="top"
            key={item.title}
          >
            <a
              href={content}
              target={['email', 'mobile'].includes(item.target) ? undefined : '_blank'}
            >
              {mediaIcons[item.title]}
            </a>
          </Tippy>
        );
      })}
    </div>
  )
}