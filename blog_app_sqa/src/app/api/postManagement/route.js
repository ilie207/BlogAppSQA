import { NextResponse } from "next/server";
import pool from "../../../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import validator from "validator";
import Tokens from "csrf";
import { verifyToken } from "../../../middleware/csrf";

const tokens = new Tokens();

export async function DELETE(req) {
  const csrfToken = req.headers.get("X-CSRF-Token");
  if (!verifyToken(csrfToken)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }
  try {
    const { id } = await req.json();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!validator.isNumeric(id.toString())) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const result = await pool.query(
      'DELETE FROM "BlogPosts" WHERE id = $1 AND user_email = $2 RETURNING *',
      [id, validator.normalizeEmail(user.email)]
    );

    if (!result.rows[0]) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req) {
  const csrfToken = req.headers.get("X-CSRF-Token");
  if (!verifyToken(csrfToken)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }
  try {
    const { title, content, id } = await req.json();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

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

    const sanitizedTitle = validator.escape(title.trim());
    const sanitizedContent = validator.escape(content.trim());

    const result = await pool.query(
      'UPDATE "BlogPosts" SET title = $1, content = $2 WHERE id = $3 AND user_email = $4 RETURNING *',
      [
        sanitizedTitle,
        sanitizedContent,
        id,
        validator.normalizeEmail(user.email),
      ]
    );

    if (!result.rows[0]) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!validator.isNumeric(id.toString())) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const result = await pool.query('SELECT * FROM "BlogPosts" WHERE id = $1', [
      id,
    ]);

    if (!result.rows[0]) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const response = NextResponse.json(result.rows[0]);
    const secret = process.env.CSRF_SECRET || tokens.secretSync();
    const token = tokens.create(secret);
    response.headers.set("x-csrf-token", token);

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
