"use client";
import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";

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
        <NavBar />

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
