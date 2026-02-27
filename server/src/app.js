const express = require("express")
const cors = require("cors")
const authRoutes = require("./routes/auth.routes")
const flightRoutes = require("./routes/flight.routes")
const bookingRoutes = require("./routes/booking.routes")

const app = express();
app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)

app.use("/flights", flightRoutes)

app.use("/bookings", bookingRoutes)


module.exports = app