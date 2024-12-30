import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="">
        <h1>Blog with Next JS</h1>
        <ul className="align-centre">
          <button role="button" href="/">
            Home
          </button>

          <button role="button" href="/createPost">
            Create Post
          </button>

          <button role="button" href="/stats">
            Stats
          </button>
        </ul>
      </main>
    </div>
  );
}
