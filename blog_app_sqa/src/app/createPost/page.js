import React from "react";
import CreatePost from "../components/CreatePost";

export default function CreatePostPage() {
  return (
    <div>
    <main>
      <h1>Blog with Next JS</h1>
      <ul className="align-centre">
        <button role="button" href="/">
          Home
        </button>
        <li>
          <a href="/createPost">Create Post</a>
        </li>
        <li>Stats</li>
      </ul>
      <CreatePost />
    </main>
  </div>
      
  
  );
}
