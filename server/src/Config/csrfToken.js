import crypto from "crypto";
import redisClient from "../Utils/redisClient.js";

/**
 * Generate CSRF Token and cache it in Redis with 1 hour expiration
 */
export const generateCSRFToken = async (id, sessionId, res) => {
  const csrfToken = crypto.randomBytes(16).toString("hex");
  const csrfTokenKey = `csrf:${id}:${sessionId}`;

  await redisClient.set(csrfTokenKey, csrfToken, {
    EX: 60 * 60, // 1 hour expiration
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("csrfToken", csrfToken, {
    httpOnly: false,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  return csrfToken;
};

/**
 * Verify CSRF Token Middleware
 */
export const verifyCSRFToken = async (req, res, next) => {
  try {
    if (req.method === "GET") {
      return next();
    }

    const userId = req.user?.id;
    const sessionId = req.user?.sessionId;

    if (!userId || !sessionId) {
      return res.status(403).json({
        success: false,
        message: "Invalid or unauthenticated user session.",
        code: "CSRF_UNAUTHENTICATED",
      });
    }

    const clientToken =
      req.headers["x-csrf-token"] ||
      req.headers["x-xsrf-token"] ||
      req.headers["csrf-token"];

    if (!clientToken) {
      return res.status(403).json({
        success: false,
        message: "CSRF token missing. Please refresh the page.",
        code: "CSRF_TOKEN_MISSING",
      });
    }

    const storedSession = await redisClient.get(`csrf:${userId}:${sessionId}`);
    if (!storedSession) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired session. Please refresh the page.",
        code: "CSRF_INVALID_SESSION",
      });
    }

    if (storedSession !== clientToken) {
      return res.status(403).json({
        success: false,
        message: "CSRF token mismatch. Please refresh the page.",
        code: "CSRF_TOKEN_MISMATCH",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error during CSRF verification",
      code: "CSRF_VERIFICATION_ERROR",
    });
  }
};

/**
 * Revoke CSRF Token from Redis
 */
export const revokeCSRFToken = async (id, sessionId) => {
  const csrfTokenKey = `csrf:${id}:${sessionId}`;
  await redisClient.del(csrfTokenKey);
};

/**
 * Refresh CSRF Token (revoke previous & generate new)
 */
export const refreshCSRFToken = async (id, sessionId, res) => {
  await revokeCSRFToken(id, sessionId);
  return await generateCSRFToken(id, sessionId, res);
};

// Aliases for lowerCamelCase compatibility
export const generateCsrfToken = generateCSRFToken;
export const verifyCsrfToken = verifyCSRFToken;
export const revokeCsrfToken = revokeCSRFToken;
export const refreshCsrfToken = refreshCSRFToken;
