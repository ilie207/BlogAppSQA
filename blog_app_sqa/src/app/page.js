import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div>
      <main className="">
        <h1>Blog with Next JS</h1>
        <ul className="container-style">
          <button role="button" href="/">
            Home
          </button>

          <button type="button" href={"/createPost"}>
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
