const Flight = require('../models/flight.model');

// 1. ADD NEW FLIGHT (Admin Only)
exports.addFlight = async (req, res) => {
    try {
        const newFlight = new Flight(req.body);
        const savedFlight = await newFlight.save();
        res.status(201).json(savedFlight);
    } catch (err) {
        res.status(500).json({ message: "Error adding flight", error: err.message });
    }
};

// 2. SEARCH/GET ALL FLIGHTS (For Passengers)
exports.getFlights = async (req, res) => {
    try {
        const { source, destination } = req.query;
        let query = {};
        
        // Agar user source/destination filter lagata hai
        if (source && destination) {
            query = { 
                source: new RegExp(source, 'i'), 
                destination: new RegExp(destination, 'i') 
            };
        }

        const flights = await Flight.find(query);
        res.json(flights);
    } catch (err) {
        res.status(500).json({ message: "Error fetching flights" });
    }
};

exports.deleteFlight = async (req, res) => {
    try {
        await Flight.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Flight removed from system" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}