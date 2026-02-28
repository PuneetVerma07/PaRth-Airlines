const express = require("express")
const cors = require("cors")
const authRoutes = require("./routes/auth.routes")
const flightRoutes = require("./routes/flight.routes")
const bookingRoutes = require("./routes/booking.routes")

const app = express();

const allowedOrigins = [
    "http://localhost:5173", // for local testing
    "https://parth-airlines.vercel.app" // frontend url
]

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())




app.use("/auth", authRoutes)

app.use("/flights", flightRoutes)

app.use("/bookings", bookingRoutes)


module.exports = app