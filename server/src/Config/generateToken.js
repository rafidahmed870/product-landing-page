import jwt from "jsonwebtoken";
import crypto from "crypto";
import redisClient from "../Utils/redisClient.js";
import { generateCSRFToken } from "./csrfToken.js";

const APP_SECRET = process.env.APP_SECRET ?? process.env.SERVER_SECRET ?? null;
if (!APP_SECRET) {
  throw new Error(
    "APP_SECRET or SERVER_SECRET is not defined in the environment variables.",
  );
}

/**
 * Generate Access and Refresh JWT Tokens with Redis multi-device session support
 */
export const generateToken = async (id, tokenVersion, res) => {
  const sessionId = crypto.randomBytes(16).toString("hex");

  const accessToken = jwt.sign(
    {
      id,
      tokenVersion,
      sessionId,
    },
    APP_SECRET,
    { expiresIn: "1h" },
  );

  const refreshToken = jwt.sign(
    {
      id,
      tokenVersion,
      sessionId,
    },
    APP_SECRET,
    { expiresIn: "7d" },
  );

  // Store refresh token session in Redis (7 days TTL)
  const refreshTokenKey = `refresh:${id}:${sessionId}`;
  await redisClient.set(refreshTokenKey, refreshToken, {
    EX: 7 * 24 * 60 * 60, // 7 days expiration in seconds
  });

  // Generate corresponding CSRF token
  const csrfToken = await generateCSRFToken(id, sessionId, res);

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return { accessToken, refreshToken, csrfToken };
};

/**
 * Verify Refresh Token against Redis session store
 */
export const verifyRefreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, APP_SECRET);
    if (
      !decoded ||
      !decoded.id ||
      decoded.tokenVersion === undefined ||
      !decoded.sessionId
    ) {
      return null;
    }

    const refreshTokenKey = `refresh:${decoded.id}:${decoded.sessionId}`;
    const storedToken = await redisClient.get(refreshTokenKey);

    if (!storedToken || storedToken !== refreshToken) {
      return null;
    }

    return decoded;
  } catch (error) {
    return null;
  }
};

/**
 * Generate new Access Token using existing SessionId
 */
export const generateAccessToken = async (id, sessionId, tokenVersion, res) => {
  const accessToken = jwt.sign(
    {
      id,
      tokenVersion,
      sessionId,
    },
    APP_SECRET,
    { expiresIn: "1h" },
  );

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  return accessToken;
};

/**
 * Revoke Refresh Token session from Redis
 */
export const revokeRefreshToken = async (id, sessionId) => {
  const refreshTokenKey = `refresh:${id}:${sessionId}`;
  await redisClient.del(refreshTokenKey);
};
