import Link from "next/link";

function News() {
  return (
    <div>
      <h1>News Page</h1>
      <ul>
        <li>
          <Link href="./news/nextjs-is-a-great">
            NextJS is a great Framework
          </Link>
        </li>
        <li>
          <Link href="./news/something-else">Something Else</Link>
        </li>
      </ul>
    </div>
  );
}

export default News;
