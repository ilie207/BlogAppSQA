import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <h1>Blog with Next JS</h1>
        <ul className="align-centre">
          <button role="button" href="/">
            Home
          </button>
          <li>
            <a href="/createPostPage">Create Post</a>
          </li>
          <li>Stats</li>
        </ul>
      </main>
    </div>
  );
}
