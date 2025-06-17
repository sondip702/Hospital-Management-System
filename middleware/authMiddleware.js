const jwt = require('jsonwebtoken');
const { TokenBlacklist } = require('../models');

// module.exports = async function (req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (!token) return res.sendStatus(401).json({ error: 'No token provided' });

//   const blacklisted = await TokenBlacklist.findOne({ where: { token } });
//   if (blacklisted) return res.status(403).json({ error: 'Token is blacklisted' });

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
  
// };

module.exports = async function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Check if token is blacklisted
    const blacklisted = await TokenBlacklist.findOne({ where: { token } });
    if (blacklisted) {
      return res.status(403).json({ error: 'Token is blacklisted' });
    }

    // Verify JWT token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedUser) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
      }

      // Attach user info from token payload
      req.user = {
        id: decodedUser.id,
        role: decodedUser.role,
        username: decodedUser.username, // optional
      };

      next();
    });
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
