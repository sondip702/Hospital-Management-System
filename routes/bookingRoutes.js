const express = require('express');
const router = express.Router();
const booking = require('../controllers/bookingController');
const verify = require('../middleware/authMiddleware');

router.post('/', verify, booking.createBooking);
router.get('/my', verify, booking.getMyBookings);
router.put('/:bookingId', verify, booking.updateBookingStatus);


module.exports = router;
