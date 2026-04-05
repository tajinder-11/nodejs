import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  try {
    const tokenHeader = req.header('authorization');
    if (!tokenHeader) {
      return next();
    }

    if (!tokenHeader.startsWith('Bearer ')) {
      return res
        .status(400)
        .json({ error: 'Authorization header must start with Bearer' });
    }

    const token = tokenHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const ensureAuthenticated = async (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ error: 'You must be authenticated to access this' });
  }
  next();
};
