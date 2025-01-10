export default (sequelize, DataTypes) => {
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
      tableName: "BlogPosts",
      timestamps: true, // This ensures createdAt and updatedAt are handled
    }
  );
  return BlogPost;
};
