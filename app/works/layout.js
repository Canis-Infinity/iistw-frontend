export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
}

export const metadata = {
  metadataBase: new URL('https://iistw.com'),
  title: '作品列表｜Infinity 資訊',
  description: '我是一個能設計 UI/UX 的前端工程師。平時有想法的時候，會坐到電腦前開始把想法慢慢地實現出來，這會讓我感到有成就感且滿足。除了這個之外，我主要販售和維修電腦、筆電、零組件、周邊。',
  manifest: "https://iistw.com/manifest.json",
  keywords: [
    'Infinity 資訊',
    '電腦',
    '筆電',
    '零組件',
    '周邊',
    '維修',
    '設計',
    'UI',
    'UX',
    '前端工程師',
    '部落格',
  ],
  authors: [{ name: '張永昌' }],
  creator: '張永昌',
  publisher: '張永昌',
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  openGraph: {
    title: '作品列表｜Infinity 資訊',
    url: 'https://blog.iistw.com/',
    siteName: 'Infinity 資訊',
    description: '我是一個能設計 UI/UX 的前端工程師。平時有想法的時候，會坐到電腦前開始把想法慢慢地實現出來，這會讓我感到有成就感且滿足。除了這個之外，我主要販售和維修電腦、筆電、零組件、周邊。',
    type: 'website',
    locale: 'zh_TW',
  },
  twitter: {
    card: 'summary_large_image',
    title: '作品列表｜Infinity 資訊',
    description: '我是一個能設計 UI/UX 的前端工程師。平時有想法的時候，會坐到電腦前開始把想法慢慢地實現出來，這會讓我感到有成就感且滿足。除了這個之外，我主要販售和維修電腦、筆電、零組件、周邊。',
    creator: "@iistw22788",
    siteId: '@iistw22788',
  },
  appleWebApp: {
    title: '作品列表｜Infinity 資訊',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: [
      {
        url: '/favicon.png',
      },
      {
        url: '/icon-192x192.png',
        size: '192x192',
      },
      {
        url: '/icon-256x256.png',
        size: '256x256',
      },
      {
        url: '/icon-364x364.png',
        size: '364x364',
      },
      {
        url: '/icon-512x512.png',
        size: '512x512',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Layout({ children }) {
  return (
    <>
      {children}
    </>
  )
}
