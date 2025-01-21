"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import BlogPost from "../components/BlogPost";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/allPosts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <Header />
      <main>
        <NavBar />
        {posts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default HomePage;
