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
      const fetchPost = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/postManagement?id=${encodeURIComponent(id)}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              credentials: "include",
            }
          );

          if (response.status === 400) {
            setError("Invalid post ID format");
            return;
          }

          const data = await response.json();
          setPost(data);
        } catch (err) {
          setError("Unable to load post content");
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
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
