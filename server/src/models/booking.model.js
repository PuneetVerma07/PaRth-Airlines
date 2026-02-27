const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    flight: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Flight', 
        required: true 
    },
    seatNumber: { type: String, required: true },
    bookingStatus: { 
        type: String, 
        enum: ['Confirmed', 'Cancelled'], 
        default: 'Confirmed' 
    },
    paymentStatus: { 
        type: String, 
        enum: ['Pending', 'Completed'], 
        default: 'Completed' 
    },
    qrCode: { type: String } // Boarding pass generator ke liye 
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);