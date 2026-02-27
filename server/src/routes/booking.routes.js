const express = require('express');
const router = express.Router();
const { bookTicket, getUserBookings, cancelTicket } = require('../controllers/booking.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Route for booking a ticket
router.post('/book', verifyToken, bookTicket);

// Route for passenger to see their history
router.get('/my-bookings', verifyToken, getUserBookings);

// Path: /bookings/cancel/:bookingId
router.put('/cancel/:bookingId', verifyToken, cancelTicket);

module.exports = router;