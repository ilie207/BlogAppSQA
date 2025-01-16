import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const sort = searchParams.get("sort");

    let searchResults = [];
    let allPosts = [];

    const orderBy =
      sort === "alphabet" ? "ORDER BY title ASC" : 'ORDER BY "createdAt" DESC';

    if (query) {
      // Search query for matching posts
      const searchQuery = `
      SELECT title, content, author, "createdAt"
      FROM "BlogPosts" 
      WHERE title ILIKE $1 
      OR author ILIKE $1 
      ${orderBy}
    `;
      const searchResult = await pool.query(searchQuery, [`%${query}%`]);
      searchResults = searchResult.rows;

      // Get remaining posts
      const remainingQuery = `
        SELECT * FROM "BlogPosts" 
        WHERE id NOT IN (
          SELECT id FROM "BlogPosts" 
          WHERE title ILIKE $1 
          OR author ILIKE $1
        )
        ${orderBy}
      `;
      const remainingResult = await pool.query(remainingQuery, [`%${query}%`]);
      allPosts = remainingResult.rows;
    } else {
      // If no search query, get all posts
      const allPostsQuery = `SELECT * FROM "BlogPosts" ${orderBy}`;
      const result = await pool.query(allPostsQuery);
      allPosts = result.rows;
    }

    return NextResponse.json({
      searchResults,
      allPosts,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
