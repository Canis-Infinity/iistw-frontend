export default function Section({ id, heading, intro, className, children }) {
  return (
    <section
      id={id}
      className={[
        'relative isolate w-full px-6 py-24 md:px-10 md:py-28 lg:px-16',
        className,
      ].filter(Boolean).join(' ')}
    >
      <hgroup className="mx-auto mb-12 flex w-full max-w-3xl flex-col items-center gap-4 text-center">
        <h2 className="font-mono text-3xl font-bold uppercase text-primary md:text-4xl">
          <span className="text-primary/50">{'{'}</span>
          {heading}
          <span className="text-primary/50">{'}'}</span>
        </h2>
        <p
          className="max-w-2xl text-center text-base leading-7 text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
      </hgroup>
      <div className="mx-auto w-full max-w-[1200px]">
        {children}
      </div>
    </section>
  );
}
