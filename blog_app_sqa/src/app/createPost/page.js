import React from "react";
import CreatePost from "../components/CreatePost";
import NavBar from "../components/NavBar";

export default function CreatePostPage() {
  return (
    <div>
      <main>
        <h1>Blog with Next JS</h1>
        <NavBar />
        <CreatePost />
      </main>
    </div>
  );
}
