import { useState, useEffect } from "react";
import { getCurrentUser } from "../actions/actions";

export default function BlogPost({ post }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then((userData) => {
      setUser(userData);
    });
  }, []);

  console.log("user email:", user?.email);
  console.log("post email:", post.user_email);
  const isCreator = user?.email === post.user_email;

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
              <button onClick={() => handleEdit(post.id)}>Edit</button>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </>
          )}
        </li>
      </ul>
    </div>
  );
}
