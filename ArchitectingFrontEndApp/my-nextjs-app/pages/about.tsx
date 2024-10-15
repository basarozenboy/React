// pages/about.tsx
import Link from "next/link";

const About = () => {
  return (
    <div>
      <h1>About Us</h1>
      <Link href="/">
        <a>Go to Home Page</a>
      </Link>
    </div>
  );
};

export default About;
