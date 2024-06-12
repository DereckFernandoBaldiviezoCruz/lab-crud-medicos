import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "medic", // db name
  "postgres", // username
  "12345678", // password
  {
    host: "localhost",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  }
);
