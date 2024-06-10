import { SITE_METADATA } from '@/hooks/useSiteMetadata/constants';

export default function manifest() {
  return {
    name: SITE_METADATA.title,
    short_name: 'TKRP',
    start_url: '/',
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
    ],
  };
}
