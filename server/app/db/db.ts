import pg from "../config/pg";

export const createDB = async () => {
  try {
    await pg.query(`CREATE DATABASE netflix`);
    console.log("DB created");
  } catch (error) {
    console.log("Db creation error",error);
  };
}; 