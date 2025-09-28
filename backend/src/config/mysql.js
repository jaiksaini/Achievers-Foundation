import mysql from "mysql2/promise"

export const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "AZ1234vin##",
    database: "ngomunna",
  });

//   await db.execute(`create database NGOMunna`)
//   console.log(await db.execute(`show databases`));
  console.log("Database Connected");
  

