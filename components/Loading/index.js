import clsx from 'clsx';
import styles from './index.module.css';
import { ImSpinner8 } from 'react-icons/im';

export default function Loading({ type, content }) {
  return (
    <div
      className={clsx(styles.loading, {
        [styles[type]]: type,
        [styles.primary]: !type,
      })}
    >
      <div className={styles.spinner}>
        <ImSpinner8 />
      </div>
      {content && <div>{content}</div>}
    </div>
  );
}
