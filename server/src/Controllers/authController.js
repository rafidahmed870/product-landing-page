import bcrypt from "bcrypt";
import { TryCatch } from "../Middlewares/tryCatch.js";
import { getUserByEmail, getUserById } from "../Services/userServices.js";
import {
  generateToken,
  generateAccessToken,
  verifyRefreshToken,
  revokeRefreshToken,
} from "../Config/generateToken.js";
import { revokeCSRFToken, refreshCSRFToken } from "../Config/csrfToken.js";

// ─── Login ────────────────────────────────────────────────────────────────────
export const login = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  // generateToken sets httpOnly accessToken, refreshToken, and readable csrfToken cookies
  await generateToken(user.id, user.tokenVersion, res);

  return res.status(200).json({
    success: true,
    message: "Login successful",
  });
});

// ─── Logout ───────────────────────────────────────────────────────────────────
export const logout = TryCatch(async (req, res) => {
  const { id, sessionId } = req.user; // set by authMiddleware

  // Revoke Redis sessions
  await Promise.allSettled([
    revokeRefreshToken(id, sessionId),
    revokeCSRFToken(id, sessionId),
  ]);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("csrfToken");

  return res.status(200).json({ success: true, message: "Logged out successfully" });
});

// ─── Refresh Access Token ──────────────────────────────────────────────────────
export const refreshToken = TryCatch(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Refresh token missing" });
  }

  const decoded = await verifyRefreshToken(token);
  if (!decoded) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired refresh token" });
  }

  const user = await getUserById(decoded.id);
  if (!user || user.tokenVersion !== decoded.tokenVersion) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid session token" });
  }

  await generateAccessToken(user.id, decoded.sessionId, user.tokenVersion, res);

  return res.status(200).json({ success: true, message: "Access token refreshed" });
});

// ─── Refresh CSRF Token ───────────────────────────────────────────────────────
export const refreshCSRF = TryCatch(async (req, res) => {
  const { id, sessionId } = req.user;
  await refreshCSRFToken(id, sessionId, res);

  return res.status(200).json({ success: true, message: "CSRF token refreshed" });
});

// ─── Get Me ───────────────────────────────────────────────────────────────────
export const getMe = TryCatch(async (req, res) => {
  const { password: _pw, tokenVersion: _tv, sessionId: _sid, ...safeUser } = req.user;
  return res.status(200).json({ success: true, user: safeUser });
});

