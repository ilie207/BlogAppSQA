import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function POST(req) {
  try {
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
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
