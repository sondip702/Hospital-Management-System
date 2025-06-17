const { Booking } = require('../models');
const booking = require('../models/booking');

exports.createBooking = async (req, res) => {
  try {
    if (req.user.role !== 'patient') {
      return res.status(403).json({ error: 'Only patients can book appointments' });
    }

    const { doctorId, appointmentDate, appointmentTime, notes } = req.body;

    if (!doctorId || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const booking = await Booking.create({
      patientId: req.user.id,
      doctorId,
      appointmentDate,
      appointmentTime,
      scheduledAt: new Date(`${appointmentDate}T${appointmentTime}`),
      notes
    });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (err) {
    console.error('Booking creation error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};






exports.getMyBookings = async (req, res) => {
  try {
    let whereClause = {};

    if (req.user.role === 'patient') {
      whereClause.patientId = req.user.id;
    } else if (req.user.role === 'doctor') {
      whereClause.doctorId = req.user.id;
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }

    const bookings = await Booking.findAll({ where: whereClause });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    if (req.user.id !== booking.doctorId) {
      return res.status(403).json({ error: 'Only the doctor can update status' });
    }

    booking.status = status;
    await booking.save();
    res.json({ message: 'Booking status updated', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
