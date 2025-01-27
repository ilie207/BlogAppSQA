import { NextResponse } from "next/server";
import pool from "../../../lib/db";
import validator from "validator";
import Tokens from "csrf";

const tokens = new Tokens();

export async function GET(request) {
  const csrfToken = request.headers.get("csrf-token");
  const secret = process.env.CSRF_SECRET;

  if (!csrfToken || !tokens.verify(secret, csrfToken)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const sort = searchParams.get("sort");

  // Validate and sanitize inputs
  const sanitizedQuery = query ? validator.escape(query.trim()) : "";
  const validSort = ["alphabet", "date"].includes(sort) ? sort : "date";

  let searchResults = [];
  let allPosts = [];

  const orderBy =
    validSort === "alphabet"
      ? "ORDER BY title ASC"
      : 'ORDER BY "createdAt" DESC';

  try {
    if (sanitizedQuery) {
      const searchQuery = `
      SELECT id, title, content, author, "createdAt"
      FROM "BlogPosts" 
      WHERE title ILIKE $1 
      OR author ILIKE $1 
      ${orderBy}
    `;

      const searchResult = await pool.query(searchQuery, [
        `%${sanitizedQuery}%`,
      ]);
      searchResults = searchResult.rows;

      const remainingQuery = `
        SELECT * FROM "BlogPosts" 
        WHERE id NOT IN (
          SELECT id FROM "BlogPosts" 
          WHERE title ILIKE $1 
          OR author ILIKE $1
        )
        ${orderBy}
      `;
      const remainingResult = await pool.query(remainingQuery, [
        `%${sanitizedQuery}%`,
      ]);
      allPosts = remainingResult.rows;
    } else {
      const allPostsQuery = `SELECT * FROM "BlogPosts" ${orderBy}`;
      const result = await pool.query(allPostsQuery);
      allPosts = result.rows;
    }

    const response = NextResponse.json({
      searchResults,
      allPosts,
    });

    const token = tokens.create(secret);
    response.headers.set("x-csrf-token", token);

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
export async function POST(request) {
  const csrfToken = request.headers.get("x-csrf-token");
  const secret = process.env.CSRF_SECRET;

  if (!csrfToken || !tokens.verify(secret, csrfToken)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }
}
