// Note by Harsh: DB init file 
const mongoose = require('mongoose');

async function initializeDB(conn) {
  try {
    await mongoose.connect(conn, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("HM: Database connected successfully");
  } catch (err) {
    console.error("DB Connection Error:", err.message);
    process.exit(1);
  }
}

module.exports = initializeDB;
