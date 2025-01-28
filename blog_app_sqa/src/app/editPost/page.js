"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

export default function EditPost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    console.log("Post ID from query:", postId);
    if (postId) {
      fetch(`/api/postManagement?id=${postId}`)
        .then((res) => res.json())
        .then((data) => {
          setPost({
            title: data.title,
            content: data.content,
          });
        });
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    const csrfToken = localStorage.getItem("editCsrfToken");
    e.preventDefault();
    const response = await fetch(`/api/postManagement`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({
        ...post,
        id: postId,
      }),
    });

    if (response.ok) {
      localStorage.removeItem("editCsrfToken");
      router.push("/myBlogPosts");
    }
  };

  return (
    <div>
      <Header />
      <NavBar />
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          required
        />
        <button type="submit" className="custom_button">
          Save Changes
        </button>
      </form>
    </div>
  );
}
