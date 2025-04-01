import { SITE_METADATA } from '@/hooks/useSiteMetadata/constants';

export const dynamic = 'force-static';

export default function manifest() {
  return {
    name: SITE_METADATA.title,
    short_name: 'TKRP',
    start_url: '/',
    id: '/',
    description: SITE_METADATA.description,
    lang: 'en',
    background_color: '#000000',
    theme_color: '#000000',
    display: 'fullscreen',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      { src: '/apple-icon8.png', sizes: '48x48', type: 'image/png' },
      { src: '/apple-icon7.png', sizes: '72x72', type: 'image/png' },
      { src: '/apple-icon6.png', sizes: '96x96', type: 'image/png' },
      { src: '/apple-icon5.png', sizes: '144x144', type: 'image/png' },
      { src: '/apple-icon4.png', sizes: '192x192', type: 'image/png' },
      { src: '/apple-icon3.png', sizes: '256x256', type: 'image/png' },
      { src: '/apple-icon2.png', sizes: '384x384', type: 'image/png' },
      { src: '/apple-icon1.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/icons/icon-maskable.svg',
        sizes: '196x196',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Recent Posts',
        short_name: 'Posts',
        description: 'View all recent posts',
        url: '/posts',
        icons: [{ src: '/apple-icon6.png', sizes: '96x96' }],
      },
      {
        name: 'Recent Videos',
        short_name: 'VIdeos',
        description: 'View all recent videos',
        url: '/videos',
        icons: [{ src: '/apple-icon6.png', sizes: '96x96' }],
      },
    ],
    screenshots: [
      {
        src: '/screenshots/narrow.png',
        type: 'image/png',
        sizes: '750x1334',
        form_factor: 'narrow',
      },
      {
        src: '/screenshots/wide.png',
        type: 'image/png',
        sizes: '3584x1796',
        form_factor: 'wide',
      },
    ],
  };
}
