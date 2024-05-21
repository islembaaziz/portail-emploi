import JWT from "jsonwebtoken";
import User from "../models/userModel.js";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ error: "Auth Failed" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId);

    if (!user) {
      return res.status(401).json({ error: "Auth Failed" });
    }

    req.body.user = { 
      userId: user._id.toString(),
      role: user.role
    };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Auth Failed" });
  }
};

export default userAuth;
