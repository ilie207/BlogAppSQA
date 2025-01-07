import React from "react";
import CreatePost from "../components/CreatePost";
import NavBar from "../components/NavBar";
import Header from "../components/Header";

export default function CreatePostPage() {
  return (
    <div>
      <Header />
      <main>
        <NavBar />
        <CreatePost />
      </main>
    </div>
  );
}
