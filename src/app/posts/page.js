import SlidesPosts from '@/components/Slides/Posts';
import { getMetadata } from '@/utils';

export async function generateMetadata(_, parent) {
  const { metadataBase } = await parent;

  return getMetadata({
    title: 'Recent Posts',
    slug: '/posts',
    metadataBase,
  });
}

export default async function Page() {
  return <SlidesPosts />;
}
