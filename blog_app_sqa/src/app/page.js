"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => {
        // Ensure data is an array
        const postsArray = Array.isArray(data) ? data : [];
        setPosts(postsArray);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

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

        <ul>
          {posts.length > 0 ? (
            posts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </li>
            ))
          ) : (
            <li>No posts available</li>
          )}
        </ul>
      </main>
    </div>
  );
};

export default HomePage;
