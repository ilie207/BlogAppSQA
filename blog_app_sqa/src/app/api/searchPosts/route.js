import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function POST(req) {
  try {
<<<<<<< HEAD
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const { title, content } = await req.json();
    const now = new Date().toISOString();

    const result = await pool.query(
      'INSERT INTO "BlogPosts" (title, content, user_id, author, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, content, user.id, user.email, now, now]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM "BlogPosts"');
    return NextResponse.json(result.rows);
=======
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const sort = searchParams.get("sort");

    let searchResults = [];
    let allPosts = [];

    // Build the ORDER BY clause based on sort parameter
    const orderBy =
      sort === "alphabet" ? "ORDER BY title ASC" : 'ORDER BY "createdAt" DESC';

    if (query) {
      // Search query for matching posts
      const searchQuery = `
        SELECT * FROM "BlogPosts" 
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
>>>>>>> 92402c6 (added sort functionality)
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
