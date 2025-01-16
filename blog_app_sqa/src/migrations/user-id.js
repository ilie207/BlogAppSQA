"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("BlogPosts", "user_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("BlogPosts", "user_id", {
      type: Sequelize.STRING,
    });
  },
};
