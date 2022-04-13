import { GetStaticPaths, GetStaticProps } from 'next';
import { lessons } from '../../lessons';
import { useEffect, useRef } from 'react';

const Lesson = ({ slug }: { slug: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeJSExample = lessons[slug];

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    threeJSExample(canvasRef.current);
  }, [threeJSExample]);

  return <canvas ref={canvasRef} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;

  if (!slug) {
    return { notFound: true };
  }

  return {
    props: { slug },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(lessons).map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Lesson;
