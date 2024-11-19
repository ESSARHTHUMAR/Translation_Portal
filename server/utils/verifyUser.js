// middlewares/verifyToken.js
import jwt from "jsonwebtoken";
import errorHandler from "../utils/error.js";

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(errorHandler(401, "Access Denied! No Token Provided."));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded; // Attach the decoded user data to the request object
    next();
  } catch (error) {
    return next(errorHandler(403, "Invalid or Expired Token."));
  }
};

export default verifyToken;
