import styles from './index.module.css';

export default function Skills({ icon, content }) {
  return (
    <div className={styles.skill}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
}
