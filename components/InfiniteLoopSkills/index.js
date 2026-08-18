import { useEffect, useState } from 'react';

const rows = 5;
const duration = 50000;

const Tag = ({ icon, content }) => {
  return (
    <div className="inline-flex shrink-0 items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm shadow-sm [&_svg]:size-4 [&_svg]:text-primary">
      {icon}
      {content}
    </div>
  );
};

const Slider = ({ children, reverse }) => {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        '--duration': `${
          Math.floor(Math.random() * (duration + 5000 - (duration - 5000))) +
          (duration - 5000)
        }ms`,
        '--direction': reverse ? 'reverse' : 'normal',
      }}
      suppressHydrationWarning
    >
      <div className="flex w-max gap-3 py-1 [animation:loop-scroll_var(--duration)_linear_infinite] [animation-direction:var(--direction)]">
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
    <div className="relative hidden max-h-80 w-full flex-col gap-2 overflow-hidden md:flex">
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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />
    </div>
  );
}
