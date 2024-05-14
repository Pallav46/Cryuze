const app = require("./app");

const dotenv = require("dotenv");
const connectDB = require("./config/database");

// config
dotenv.config({ path: "backend/config/.env" });

// Connect to databse
connectDB()


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
