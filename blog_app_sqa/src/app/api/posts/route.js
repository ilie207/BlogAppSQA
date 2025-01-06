import { NextResponse } from "next/server";
import db from "../../../models";

export async function GET() {
  try {
    const posts = await db.BlogPost.findAll({
      attributes: ["id", "title", "content", "createdAt", "updatedAt"],
    });
    console.log("Posts fetched:", posts);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
