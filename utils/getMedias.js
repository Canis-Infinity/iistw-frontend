import { RiGithubLine, RiFacebookFill, RiCodepenLine } from 'react-icons/ri';
import { TbBrandTwitter, TbMail, TbPhoneCall } from 'react-icons/tb';

export const mediaIcons = {
  github: <RiGithubLine />,
  codepen: <RiCodepenLine />,
  facebook: <RiFacebookFill />,
  twitter: <TbBrandTwitter />,
  email: <TbMail />,
  mobile: <TbPhoneCall />,
}

export const mediaContents = {
  github: {
    tw: 'Github',
    cn: 'Github',
    en: 'Github',
  },
  codepen: {
    tw: 'CodePen',
    cn: 'CodePen',
    en: 'CodePen',
  },
  facebook: {
    tw: 'facebook',
    cn: 'facebook',
    en: 'facebook',
  },
  twitter: {
    tw: 'Twitter',
    cn: 'Twitter',
    en: 'Twitter',
  },
  email: {
    tw: '信箱',
    cn: '信箱',
    en: 'Email',
  },
  mobile: {
    tw: '手機',
    cn: '手机',
    en: 'Mobile',
  },
}