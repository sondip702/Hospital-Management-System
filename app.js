require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');




app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);



sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => console.log('Server running...'));
});
