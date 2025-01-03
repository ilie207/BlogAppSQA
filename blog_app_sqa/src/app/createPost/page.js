import React from "react";
import CreatePost from "../components/CreatePost";
import Link from "next/link";

export default function CreatePostPage() {
  return (
    <div>
      <main className="">
        <h1>Blog with Next JS</h1>
        <ul className="container-style">
          <Link href="/" className="button">
            Home
          </Link>
          <Link href="/createPost" className="button">
            Create Post
          </Link>
          <Link href="/stats" className="button">
            Stats
          </Link>
        </ul>
        <CreatePost />
      </main>
    </div>
  );
}
