import app from "./app.js";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";

dotenv.config();
dbConnect();
app.listen(3000, () => {
  console.log("Server is running...");
});
