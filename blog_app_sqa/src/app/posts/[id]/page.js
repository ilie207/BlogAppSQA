"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";

export default function PostDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Extract 'id' from query parameters
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/postManagement?id=${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch post details");
          return res.json();
        })
        .then((data) => {
          setPost(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching post:", err);
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div>
      <Header />
      <main>
        <NavBar />
        <div className="post-details">
          <h1>{post.title}</h1>
          <span>
            <small>Author: {post.author}</small>
            <small>
              Created: {new Date(post.createdAt).toLocaleDateString()}
            </small>
          </span>
          <p
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/\d\./g, "<br>$&")
                .replace(/<br>/, ""),
            }}
            className="post-content"
          />
        </div>
      </main>
    </div>
  );
}
