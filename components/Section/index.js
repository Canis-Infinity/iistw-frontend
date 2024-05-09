import sectionStyles from '@/styles/section.module.css';

export default function Section({ id, heading, intro, className, children }) {
  return (
    <section id={id} className={className}>
      <hgroup className={sectionStyles.header}>
        <h2>{heading}</h2>
        <p dangerouslySetInnerHTML={{ __html: intro }}></p>
      </hgroup>
      {children}
    </section>
  );
}