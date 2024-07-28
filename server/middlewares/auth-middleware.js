const jwt = require('jsonwebtoken');
const  User  = require('../models/user_model');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Token not provided.' });
  }

  const jwtToken = token.replace('Bearer ', '').trim();
  

  try {
    console.log('JWT Token:', jwtToken);  // Debugging: Log the received token
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log('Verified Payload:', isVerified);  // Debugging: Log the verified payload
    const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 });

    if (!userData) {
      return res.status(401).json({ message: 'Unauthorized. User not found.' });
    }

    req.user = userData;
    req.token = jwtToken;
    req.userID = userData._id;

    next();
  } catch (error) {
    console.error('Authentication error:', error);  // Log the error for debugging
    return res.status(401).json({ message: 'Failed token not matched' });
  }
};

module.exports = authMiddleware;
