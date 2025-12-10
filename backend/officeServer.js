const dotenv = require("dotenv");
dotenv.config();

    const express = require("express");
const cors = require("cors");
const initDB = require("./config/initDb");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.APP_PORT || 5600;
const DB = process.env.MONGO_CONN;

initDB(DB);

console.log("Harsh: Server starting at", new Date().toLocaleString());



app.use("/api/officeStaff", require("./routes/staffRoutes"));

app.get("/", (req, res) => {
  res.send("Employee Workspace Backend Running - HM");
});

app.listen(PORT, () => console.log(`HM Backend Live @ ${PORT}`));
