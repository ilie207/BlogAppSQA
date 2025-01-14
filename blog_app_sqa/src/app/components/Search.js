import { useState } from "react";

export default function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `/api/posts?query=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) throw new Error("Error fetching search results");

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search posts..."
        className="search-input"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="search-button"
      >
        {loading ? "Searching..." : "Search"}
      </button>

      <div className="search-results">
        {results.length > 0 ? (
          <ul>
            {results.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <small>Author: {post.author}</small>
                <small>
                  Created: {new Date(post.createdAt).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}
