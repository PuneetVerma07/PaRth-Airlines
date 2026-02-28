const express = require("express")
const cors = require("cors")
const authRoutes = require("./routes/auth.routes")
const flightRoutes = require("./routes/flight.routes")
const bookingRoutes = require("./routes/booking.routes")

const app = express();

const allowedOrigins = [
    "https://parth-airlines.vercel.app" ,// frontend url
    "http://localhost:5173", // for local testing
]

app.use(cors({
    origin: function (origin, callback) {
        if(!origin) return callback(null, true)
        if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
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