import jwt from 'jsonwebtoken';

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        _status: false,
        _message: 'No token provided. Please log in.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        _status: false,
        _message: 'Token expired. Please log in again.',
        expired: true
      });
    }
    return res.status(401).json({
      _status: false,
      _message: 'Invalid token. Please log in again.'
    });
  }
};
