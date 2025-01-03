import { NextResponse } from "next/server";
import db from "../../../models/index.js";

export async function GET() {
  try {
    const posts = await db.BlogPost.findAll();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
