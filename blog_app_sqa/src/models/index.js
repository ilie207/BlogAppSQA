import { Sequelize, DataTypes } from "sequelize";
import BlogPostModel from "./blogpost";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  logging: true,
});

const db = {
  BlogPost: BlogPostModel(sequelize, DataTypes),
  sequelize,
  Sequelize,
};

// Testing the connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Connection error:", err));

export default db;
