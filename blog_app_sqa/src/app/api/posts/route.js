import { NextResponse } from "next/server";
import db from "../../../models";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url); // Parse query parameters
    const query = searchParams.get("query"); // Get 'query' parameter

    let posts;

    if (query) {
      posts = await db.BlogPost.findAll({
        where: {
          [db.Sequelize.Op.or]: [
            {
              title: {
                [db.Sequelize.Op.iLike]: `%${query}%`, // Case-insensitive match for title
              },
            },
            {
              author: {
                [db.Sequelize.Op.iLike]: `%${query}%`, // Case-insensitive match for author
              },
            },
          ],
        },
        attributes: [
          "id",
          "title",
          "content",
          "author",
          "createdAt",
          "updatedAt",
        ],
      });
    } else {
      // Fetch all posts if no search query is provided
      posts = await db.BlogPost.findAll({
        attributes: [
          "id",
          "title",
          "content",
          "author",
          "createdAt",
          "updatedAt",
        ],
      });
    }

    console.log("Posts fetched:", posts);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newPost = await db.BlogPost.create({
      title: body.title,
      content: body.content,
      author: body.author,
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
