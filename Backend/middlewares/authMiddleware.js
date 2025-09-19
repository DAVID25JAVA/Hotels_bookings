import User from "../models/User.js";

const isUser = async (req, res, next) => {
  try {
    const { userId } = req.auth;
    if (!userId) {
      res.json({ success: false, message: "user not authenticated" });
      return;
    } else {
      const user = await User.findById(userId);
      req.user = user;
      next();
    }
  } catch (error) {
    res.json({ success: false, message: error?.message });
  }
};

export default isUser;
