const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightNumber: { type: String, required: true, unique: true },
    airlineName: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: Date, required: true },
    price: { type: Number, required: true },
    seatsAvailability: { type: Number, required: true },
    totalSeats: { type: Number, default: 60 }
}, { timestamps: true });

const Flight = mongoose.model("Flight", flightSchema)

module.exports = Flight