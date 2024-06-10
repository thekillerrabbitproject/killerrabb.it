import SlidesPosts from '@/components/Slides/Posts';
import SlidesVideos from '@/components/Slides/Videos';

export default async function Page() {
  return (
    <>
      <SlidesVideos />
      <SlidesPosts />
    </>
  );
}
