import { useState, useId } from "react";
import Link from "next/link";

export default function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [searchResults, setSearchResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const uniqueKey = useId();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const tokenResponse = await fetch("/api/csrf/token");
      const { csrfToken } = await tokenResponse.json();

      const cleanQuery = searchQuery.trim();
      const response = await fetch(
        `/api/searchPosts?query=${encodeURIComponent(
          cleanQuery
        )}&sort=${sortOption}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "csrf-token": csrfToken, // Make sure this matches what the backend expects
          },
          credentials: "include",
        }
      );

      if (response.status === 400) {
        throw new Error("Invalid search parameters");
      }

      const data = await response.json();
      setSearchResults(data.searchResults || []);
      setAllPosts(data.allPosts || []);
    } catch (error) {
      setSearchResults([]);
      setAllPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
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
          <option value="date">Sort by Latest</option>
          <option value="alphabet">Sort by Alphabet</option>
        </select>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="search-button"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="results-container">
        <div className="search-results">
          <h2>Search Results</h2>
          {searchResults.length > 0 ? (
            <ul key={uniqueKey} data-testid="search-results">
              {searchResults.map(
                (post) =>
                  post.id && (
                    <li key={`search-${post.id}`}>
                      <Link href={`/posts/${post.id}?id=${post.id}`}>
                        <h3>{post.title}</h3>
                      </Link>
                      <small>Author: {post.author}</small>
                      <small>
                        Created: {new Date(post.createdAt).toLocaleDateString()}
                      </small>
                    </li>
                  )
              )}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>

        <div className="all-posts">
          <h2>All Posts</h2>
          {allPosts.length > 0 ? (
            <ul key={uniqueKey} data-testid="all-posts">
              {allPosts.map((post) => (
                <li key={`all-${post.id}`}>
                  <Link href={`/posts/${post.id}?id=${post.id}`}>
                    <h3>{post.title}</h3>
                  </Link>
                  <small>Author: {post.author}</small>
                  <small>
                    Created: {new Date(post.createdAt).toLocaleDateString()}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
