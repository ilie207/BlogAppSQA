import { Sequelize, DataTypes } from "sequelize";
import BlogPostModel from "./blogpost";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "ilie",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "blog_app_development",
  port: process.env.DB_PORT || 5432,
  logging: true,
});

const db = {
  BlogPost: BlogPostModel(sequelize, DataTypes),
  sequelize,
  Sequelize,
};

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Connection error:", err));

export default db;
