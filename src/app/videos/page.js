import SlidesVideos from '@/components/Slides/Videos';
import { getMetadata } from '@/utils';

export async function generateMetadata(_, parent) {
  const { metadataBase } = await parent;

  return getMetadata({
    title: 'Recent Videos',
    slug: '/videos',
    metadataBase,
  });
}

export default async function Page() {
  return <SlidesVideos disableSlider />;
}
