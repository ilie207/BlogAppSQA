"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("blog_posts", [
      {
        title: "First Blog Post",
        content: "This is the content of the first blog post.",
        author: "John Doe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Second Blog Post",
        content: "This is the content of the second blog post.",
        author: "Jane Doe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("blog_posts", null, {});
  },
};
