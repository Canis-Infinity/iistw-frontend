import { translations } from '@/utils/i18n';

export default function manifest() {
  return {
    "name": "Infinity 資訊",
    "short_name": "Infinity 資訊",
    "id": "/",
    "start_url": "/",
    "scope": "/",
    "display": "standalone",
    "background_color": "#141414",
    "theme_color": "#141414",
    "description": translations.site.description.tw,
    "icons": [
      {
        "src": "/icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/icon-256x256.png",
        "sizes": "256x256",
        "type": "image/png"
      },
      {
        "src": "/icon-384x384.png",
        "sizes": "384x384",
        "type": "image/png"
      },
      {
        "src": "/icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
  }
}
