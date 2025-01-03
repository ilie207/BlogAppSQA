module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    "BlogPost",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "BlogPosts", // Explicitly define table name
      timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
  );

  // Define any associations (if applicable)
  BlogPost.associate = (models) => {
    // Example: BlogPost.hasMany(models.Comment);
  };

  return BlogPost;
};
