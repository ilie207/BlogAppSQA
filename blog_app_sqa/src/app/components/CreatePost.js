"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

function CreatePost() {
  const router = useRouter();
  const { user } = useKindeAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    user_id: user?.id || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/allPosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
        author: formData.author,
        user_email: user?.email,
      }),
    });

    const data = await response.json();
    console.log("Response:", data);

    if (response.ok) {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Content"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        required
      />
      <button type="submit" className="custom_button">
        Create Post
      </button>
    </form>
  );
}

export default CreatePost;
