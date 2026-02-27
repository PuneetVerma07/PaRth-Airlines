const express = require('express');
const router = express.Router();
const { addFlight, getFlights, deleteFlight } = require('../controllers/flight.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Route to get all flights (Public access for searching)
router.get('/', getFlights);

// Route to add a flight (Protected: Only Admin can add)
router.post('/add', verifyToken, isAdmin, addFlight);

// Flight delete route
router.delete('/:id', verifyToken, isAdmin, deleteFlight);

module.exports = router;