import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { DB_NAME } from "./constants.js";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 8000;

// connect to database
connectDB()
  .then(() => {
    // start the server
    app.listen(port, () => {
      console.log(
        `Server is running on port ${port}`
      );
    });
  })
  .catch((error) => {
    console.log("Failed to connect to database ", error);
  });
