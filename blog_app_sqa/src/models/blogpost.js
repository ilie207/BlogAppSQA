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
    },
    {
      tableName: "BlogPosts",
      timestamps: true,
    }
  );
  return BlogPost;
};
