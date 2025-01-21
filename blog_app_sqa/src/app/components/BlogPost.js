import { useState, useEffect } from "react";
import { getCurrentUser } from "../actions/actions";
import { useRouter } from "next/navigation";

export default function BlogPost({ post }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getCurrentUser().then((userData) => {
      setUser(userData);
    });
  }, []);

  const isCreator = user?.email === post.user_email;

  const handleDelete = async () => {
    const response = await fetch(`/api/postManagement`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: post.id }),
    });

    if (response.ok) {
      router.refresh();
      window.location.reload();
    }
  };

  const handleEdit = () => {
    router.push(`/editPost?id=${post.id}`);
  };

  if (!isCreator) {
    return null;
  }

  return (
    <div>
      <ul>
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>Author: {post.author}</small>
          <small>Email: {post.user_email}</small>
          <small>
            Created: {new Date(post.createdAt).toLocaleDateString()}
          </small>
          {isCreator && (
            <>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </li>
      </ul>
    </div>
  );
}
