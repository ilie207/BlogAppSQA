import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import pool from "../../../lib/db";
import validator from "validator";
import { verifyToken } from "../../../middleware/csrf";

export async function POST(req) {
  const csrfToken = req.headers.get("X-CSRF-Token");
  if (!verifyToken(csrfToken)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const { title, content, author } = await req.json();
    const now = new Date().toISOString();

    // Validate inputs
    if (!validator.isLength(title, { min: 1, max: 255 })) {
      return NextResponse.json(
        { error: "Invalid title length" },
        { status: 400 }
      );
    }

    if (!validator.isLength(content, { min: 1 })) {
      return NextResponse.json(
        { error: "Content cannot be empty" },
        { status: 400 }
      );
    }

    if (!validator.isLength(author, { min: 1, max: 100 })) {
      return NextResponse.json(
        { error: "Invalid author name" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedTitle = validator.escape(title.trim());
    const sanitizedContent = validator.escape(content.trim());
    const sanitizedAuthor = validator.escape(author.trim());
    const sanitizedEmail = validator.normalizeEmail(user.email);

    const result = await pool.query(
      'INSERT INTO "BlogPosts" (title, content, author, user_email, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        sanitizedTitle,
        sanitizedContent,
        sanitizedAuthor,
        sanitizedEmail,
        now,
        now,
      ]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM "BlogPosts" ORDER BY "createdAt" DESC'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
