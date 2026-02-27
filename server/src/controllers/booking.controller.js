const Booking = require('../models/booking.model');
const Flight = require('../models/flight.model');
const QRCode = require('qrcode');

exports.bookTicket = async (req, res) => {
    try {
        const { flightId, seatNumber } = req.body;
        const userId = req.user.id; // verifyToken middleware se milega

        // 1. Check Flight & Availability
        const flight = await Flight.findById(flightId);
        if (!flight || flight.seatsAvailability <= 0) {
            return res.status(400).json({ message: "No seats available or flight not found" });
        }

        // 2. Generate QR Code Data (Synopsis requirement) 
        const qrData = `Ticket for User: ${userId}, Flight: ${flight.flightNumber}, Seat: ${seatNumber}`;
        const qrCodeImage = await QRCode.toDataURL(qrData);

        // 3. Create Booking
        const newBooking = new Booking({
            user: userId,
            flight: flightId,
            seatNumber,
            qrCode: qrCodeImage,
            paymentStatus: 'Completed' // Abhi ke liye default
        });

        const savedBooking = await newBooking.save();

        // 4. Update Seats in Flight Collection 
        flight.seatsAvailability -= 1;
        await flight.save();

        res.status(201).json({ 
            message: "Booking Successful!", 
            bookingDetails: savedBooking 
        });

    } catch (err) {
        res.status(500).json({ message: "Booking failed", error: err.message });
    }
};

// Passenger apni bookings dekh sakega [cite: 100]
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('flight');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: "Error fetching bookings" });
    }
};

// CANCELLATION LOGIC
exports.cancelTicket = async (req, res) => {
    try {
        const { bookingId } = req.params;

        // 1. Booking find karein
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        // Check ki kya booking pehle hi cancel toh nahi ho chuki
        if (booking.bookingStatus === 'Cancelled') {
            return res.status(400).json({ message: "Ticket is already cancelled" });
        }

        // 2. Flight find karein seat recovery ke liye
        const flight = await Flight.findById(booking.flight);
        if (flight) {
            flight.seatsAvailability += 1; // Seat recovery logic 
            await flight.save();
        }

        // 3. Status update karein
        booking.bookingStatus = 'Cancelled';
        await booking.save();

        res.json({ 
            message: "Ticket cancelled successfully and seat recovered.",
            refundStatus: "Refund of " + (flight ? flight.price : "amount") + " initiated." // Synopsis requirement 
        });

    } catch (err) {
        res.status(500).json({ message: "Cancellation failed", error: err.message });
    }
};