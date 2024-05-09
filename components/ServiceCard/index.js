import clsx from 'clsx';
import styles from './index.module.css';

export default function ServiceCard({ icon, title, content, currentLang }) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p className={clsx({ [styles.alignLeft]: currentLang === 'en' })}>
          {content}
        </p>
      </div>
    </div>
  );
}
