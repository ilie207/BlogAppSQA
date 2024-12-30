import React from "react";
import CreatePost from "../components/CreatePost";

export default function CreatePostPage() {
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
        <CreatePost />
      </main>
    </div>
  );
}
