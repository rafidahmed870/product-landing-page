import jwt from "jsonwebtoken";
import { getUserById } from "../Services/userServices.js";

const APP_SECRET = process.env.APP_SECRET ?? process.env.SERVER_SECRET ?? "secret";

export const authMiddleware = async (req, res, next) => {
  try {
    // Read accessToken from httpOnly cookie (set by generateToken)
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No access token provided",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, APP_SECRET);
    } catch {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or expired access token",
      });
    }

    if (!decoded?.id || !decoded?.sessionId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Malformed token",
      });
    }

    const user = await getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    // Attach user + sessionId to req (sessionId needed by verifyCSRFToken)
    req.user = { ...user, sessionId: decoded.sessionId };

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
