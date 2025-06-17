// models/booking.js
// module.exports = (sequelize, DataTypes) => {
//   const Booking = sequelize.define('Booking', {
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     coachId: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     appointmentDate: {
//       type: DataTypes.DATE,
//       allowNull: false
//     }
//   });

//   return Booking;
// };
// models/Booking.js

// module.exports = (sequelize, DataTypes) => {
//   const Booking = sequelize.define('Booking', {
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     coachId: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     patientId: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     doctorId: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     appointmentDate: {
//       type: DataTypes.DATEONLY,
//       allowNull: false
//     },
//     appointmentTime: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     status: {
//       type: DataTypes.STRING,
//       defaultValue: 'pending'
//     },
//   });

//   return Booking;
// };

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    appointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    appointmentTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    scheduledAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      defaultValue: 'pending'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
    
  });

  return Booking;
};
