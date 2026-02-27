const mongoose = require("mongoose")

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("error connecting to DB", err))
}

module.exports = connectToDB;