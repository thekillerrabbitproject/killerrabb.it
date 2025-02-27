import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { SITE_METADATA } from '@/hooks/useSiteMetadata/constants';
import { children } from '@/types';

import '@/css/global.css';
import localFont from 'next/font/local';
import { ViewTransitions } from 'next-view-transitions';

const vcrFont = localFont({
  src: './fonts/vcr-osd-mono.woff2',
  display: 'swap',
  variable: '--font-vcr',
  adjustFontFallback: false,
});

const robotoFont = localFont({
  src: [
    {
      path: './fonts/roboto-mono-v23-latin-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/roboto-mono-v23-latin-300italic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/roboto-mono-v23-latin-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/roboto-mono-v23-latin-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/roboto-mono-v23-latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/roboto-mono-v23-latin-700italic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-negative',
  adjustFontFallback: false,
});

const RootLayout = ({ children }) => (
  <ViewTransitions>
    <html lang="en" className={`${vcrFont.variable} ${robotoFont.variable}`}>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body suppressHydrationWarning>
        <Header />
        <main>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  </ViewTransitions>
);

RootLayout.propTypes = children;

export const viewport = {
  themeColor: '#000000',
};

export const metadata = {
  metadataBase: new URL(SITE_METADATA.siteUrl),
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${SITE_METADATA.title}`,
  },
  description: SITE_METADATA.description,
  alternates: {
    canonical: SITE_METADATA.siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    image: `${SITE_METADATA.siteUrl}/static-assets/shareImages/share-tkrp.png`,
    'og:image': `${SITE_METADATA.siteUrl}/static-assets/shareImages/share-tkrp.png`,
    'og:title': SITE_METADATA.title,
    'og:description': SITE_METADATA.description,
    'og:siteName': SITE_METADATA.title,
    'og:url': SITE_METADATA.siteUrl,
    'og:locale': 'en_US',
    'og:type': 'website',
  },
};

export default RootLayout;
