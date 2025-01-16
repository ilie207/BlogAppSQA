"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("BlogPosts", "user_email", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "legacy@email.com",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("BlogPosts", "user_email");
  },
};
