import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(payload.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = { userId: payload.userId, role: user.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

export default userAuth;
