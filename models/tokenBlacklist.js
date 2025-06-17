const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const TokenBlacklist = sequelize.define('TokenBlacklist', {
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    }
  });

  return TokenBlacklist;
};
