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
    const query = searchParams.get("query"); // Get 'query' parameter
    const sort = searchParams.get("sort"); // Get 'sort' parameter

    let searchResults = [];
    let allPosts = [];

    // Determine sorting order
    let order = [["createdAt", "DESC"]]; // Default: Latest first
    if (sort === "alphabet") {
      order = [["title", "ASC"]]; // Sort by title alphabetically
    }

    if (query) {
      // Fetch posts that match the query
      searchResults = await db.BlogPost.findAll({
        where: {
          [db.Sequelize.Op.or]: [
            {
              title: {
                [db.Sequelize.Op.iLike]: `%${query}%`,
              },
            },
            {
              author: {
                [db.Sequelize.Op.iLike]: `%${query}%`,
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
        order, // Apply sorting to search results
      });

      // Fetch all posts excluding the search results
      const excludedIds = searchResults.map((post) => post.id);
      allPosts = await db.BlogPost.findAll({
        where: {
          id: {
            [db.Sequelize.Op.notIn]: excludedIds,
          },
        },
        attributes: [
          "id",
          "title",
          "content",
          "author",
          "createdAt",
          "updatedAt",
        ],
        order, // Apply sorting to remaining posts
      });
    } else {
      // If no query, fetch all posts
      allPosts = await db.BlogPost.findAll({
        attributes: [
          "id",
          "title",
          "content",
          "author",
          "createdAt",
          "updatedAt",
        ],
        order, // Apply sorting to all posts
      });
    }

    console.log("Search results:", searchResults);
    console.log("Remaining posts:", allPosts);

    // Combine search results and remaining posts for the frontend
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
