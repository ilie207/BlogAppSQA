"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import validator from "validator";

function CreatePost() {
  const router = useRouter();
  const { user } = useKindeAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    user_id: user?.id || "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!validator.isLength(formData.title, { min: 1, max: 255 })) {
      newErrors.title = "Title must be between 1 and 255 characters";
    }

    if (!validator.isLength(formData.content, { min: 1 })) {
      newErrors.content = "Content cannot be empty";
    }

    if (!validator.isLength(formData.author, { min: 1, max: 100 })) {
      newErrors.author = "Author name must be between 1 and 100 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const sanitizedData = {
      title: validator.escape(formData.title.trim()),
      content: validator.escape(formData.content.trim()).replace(/\n/g, "<br>"),
      author: validator.escape(formData.author.trim()),
      user_email: user?.email,
    };

    const response = await fetch("/api/allPosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sanitizedData),
    });

    const data = await response.json();

    if (response.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setErrors({ submit: data.error || "Failed to create post" });
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
        maxLength={255}
      />
      {errors.title && <span className="error">{errors.title}</span>}

      <textarea
        placeholder="Content"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        required
      />
      {errors.content && <span className="error">{errors.content}</span>}

      <input
        type="text"
        placeholder="Author"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        required
        maxLength={100}
      />
      {errors.author && <span className="error">{errors.author}</span>}

      {errors.submit && <div className="error">{errors.submit}</div>}

      <button type="submit" className="custom_button">
        Create Post
      </button>
    </form>
  );
}

export default CreatePost;
