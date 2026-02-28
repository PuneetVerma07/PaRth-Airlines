require("dotenv").config();

const app = require("./src/app")
const connectToDB = require("./src/config/db")

const PORT = process.env || 5000;

connectToDB();



app.listen(5000, () => {
    console.log("Server is running on port 5000")
})