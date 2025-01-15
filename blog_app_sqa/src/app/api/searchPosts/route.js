import { NextResponse } from "next/server";
import db from "../../../models";

export async function GET(request) {
  try {
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
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
