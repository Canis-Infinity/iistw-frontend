import { TbCodeDots, TbDeviceLaptop } from 'react-icons/tb';
import { IoHardwareChipOutline, IoHeadsetOutline } from 'react-icons/io5';
import { RiToolsFill } from 'react-icons/ri';

export const servicesList = [
  {
    order: 1,
    icon: <TbCodeDots />,
    title: {
      tw: '網站與系統開發',
      cn: '网站与系统开发',
      en: 'Website & System Development',
    },
    content: {
      tw: `我能協助規劃與開發網站、後台管理、API 串接、資料庫設計與權限驗證等功能，並依照需求處理前端介面、後端流程與部署維護。`,
      cn: `我能协助规划与开发网站、后台管理、API 串接、数据库设计与权限验证等功能，并依照需求处理前端介面、后端流程与部署维护。`,
      en: `I can help plan and develop websites, admin systems, API integrations, database schemas, access control, frontend interfaces, backend workflows, deployment, and maintenance.`,
    },
  },
  {
    order: 2,
    icon: <TbDeviceLaptop />,
    title: {
      tw: '電腦／筆電販售',
      cn: '电脑／笔记本贩售',
      en: 'PC／Laptop Sales',
    },
    content: {
      tw: '我提供最新和最優質的電腦和筆記型電腦，滿足各種需求。無論您是尋找高性能遊戲機、專業工作站還是輕便筆電，在這裡都有選擇。品質保證，讓您的數碼生活更卓越。',
      cn: '我提供最新和最优质的电脑和笔记型电脑，满足各种需求。无论您是寻找高性能游戏机、专业工作站还是轻便笔记本，在这里都有选择。品质保证，让您的数码生活更卓越。',
      en: 'I offer the latest and highest quality PCs and laptops to meet all kinds of needs. Whether you are looking for a high-performance gaming machine, a professional workstation, or a lightweight notebook. Quality assurance makes your digital life more outstanding.',
    },
  },
  {
    order: 3,
    icon: <IoHardwareChipOutline />,
    title: {
      tw: '電腦硬體販售',
      cn: '电脑硬件贩售',
      en: 'PC Hardware Sales',
    },
    content: {
      tw: '提升您電腦性能的關鍵在於優質的硬體。我提供各種硬體選擇，包括CPU、GPU、記憶體、硬碟等，以確保您的電腦運行順暢並讓您的電腦達到最佳效能。',
      cn: '提升您电脑性能的关键在于优质的硬件。我提供各种硬件选择，包括CPU、GPU、记忆体、硬碟等，以确保您的电脑运行顺畅并让您的电脑达到最佳效能。',
      en: 'The key to improving your computer performance is quality hardware. I offer a variety of hardware options, including CPU, GPU, memory, hard drive, etc., to ensure that your computer runs smoothly and to get the best performance out of your computer.',
    },
  },
  {
    order: 4,
    icon: <IoHeadsetOutline />,
    title: {
      tw: '電腦週邊販售',
      cn: '电脑周边贩售',
      en: 'PC Peripherals Sales',
    },
    content: {
      tw: '提升您電腦體驗的關鍵在於多功能的週邊設備。我提供各種週邊，如鍵盤、滑鼠、螢幕、音響等，以滿足您的需求。讓您的工作和娛樂更加便捷。',
      cn: '提升您电脑体验的关键在于多功能的周边设备。我提供各种周边，如键盘、鼠标、屏幕、音响等，以满足您的需求。让您的工作和娱乐更加便捷。',
      en: 'The key to improving your computer experience is multi-functional peripherals. I offer a variety of peripherals, such as keyboards, mice, screens, speakers, etc., to meet your needs. Make your work and entertainment more convenient.',
    },
  },
  {
    order: 5,
    icon: <RiToolsFill />,
    title: {
      tw: '電腦維修',
      cn: '电脑维修',
      en: 'PC Repair',
    },
    content: {
      tw: '遇到電腦問題？我可以幫助您排查、解決各種硬體和軟體問題。以快速、可靠地恢復您的設備運作，確保您的工作和娛樂不受中斷。',
      cn: '遇到电脑问题？我可以帮助您排查、解决各种硬件和软件问题。以快速、可靠地恢复您的设备运作，确保您的工作和娱乐不受中断。',
      en: 'Having computer problems? I can help you troubleshoot and solve various hardware and software problems. Quickly and reliably restore your device to work to ensure that your work and entertainment are not interrupted.',
    },
  },
];
