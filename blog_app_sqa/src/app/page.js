"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <main>
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

        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <small>
                Created: {new Date(post.createdAt).toLocaleDateString()}
              </small>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default HomePage;
