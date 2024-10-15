import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link href="/about">
        <a>Go to About Page</a>
      </Link>
    </div>
  );
};

export default Home;
