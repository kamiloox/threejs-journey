import { lessons } from '../lessons';
import Link from 'next/link';

const Home = () => {
  const links = Object.keys(lessons).map((name) => (
    <Link href={`/lessons/${name}`} key={name}>
      <a>{name}</a>
    </Link>
  ));

  return (
    <div>
      <a href="https://threejs-journey.com/lessons">go to three js journey</a>
      <hr />
      {links}
    </div>
  );
};

export default Home;
