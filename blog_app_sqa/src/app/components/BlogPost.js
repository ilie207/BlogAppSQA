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
          <p
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/\d\./g, "<br>$&")
                .replace(/<br>/, ""),
            }}
            className="post-content"
          />
          <small>Author: {post.author}</small>
          <small>
            Created: {new Date(post.createdAt).toLocaleDateString()}
          </small>
          <br />
          {isCreator && (
            <div className="button-container">
              <button
                className="custom_button edit_button"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="custom_button delete_button"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}
