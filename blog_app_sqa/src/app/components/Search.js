import { useState } from "react";

export default function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("latest"); // Default sort option
  const [searchResults, setSearchResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/posts?query=${encodeURIComponent(searchQuery)}&sort=${sortOption}`
      );
      if (!response.ok) throw new Error("Error fetching posts");

      const data = await response.json();
      setSearchResults(data.searchResults);
      setAllPosts(data.allPosts);
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
        placeholder="Search by title or author"
        className="search-input"
      />
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="sort-select"
      >
        <option value="latest">Sort by Latest</option>
        <option value="alphabet">Sort by Alphabet</option>
      </select>
      <button
        onClick={handleSearch}
        disabled={loading}
        className="search-button"
      >
        {loading ? "Searching..." : "Search"}
      </button>

      <div className="search-results">
        <h2>Search Results</h2>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((post) => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <small>
                  By {post.author} on{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>

      <div className="all-posts">
        <h2>All Posts</h2>
        {allPosts.length > 0 ? (
          <ul>
            {allPosts.map((post) => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <small>
                  By {post.author} on{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}
