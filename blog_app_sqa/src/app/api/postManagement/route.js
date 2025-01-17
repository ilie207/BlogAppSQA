import { NextResponse } from "next/server";
import pool from "../../../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function DELETE(req) {
  const { id } = await req.json();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const result = await pool.query(
    'DELETE FROM "BlogPosts" WHERE id = $1 AND user_email = $2 RETURNING *',
    [id, user.email]
  );

  return NextResponse.json(result.rows[0]);
}

export async function PUT(req) {
  const { title, content, id } = await req.json();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const result = await pool.query(
    'UPDATE "BlogPosts" SET title = $1, content = $2 WHERE id = $3 AND user_email = $4 RETURNING *',
    [title, content, id, user.email]
  );

  return NextResponse.json(result.rows[0]);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  console.log("Requested post ID:", id);

  const result = await pool.query('SELECT * FROM "BlogPosts" WHERE id = $1', [
    id,
  ]);
  console.log("Database result:", result.rows[0]);
  return NextResponse.json(result.rows[0]);
}
