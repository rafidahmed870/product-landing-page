import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import redisClient from "../Utils/redisClient.js";

export const orderRateLimiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds window
  max: 1, // limit each IP to 1 order request per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: "rl:order:",
  }),
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: "অনুগ্রহ করে ৩০ সেকেন্ড পর আবার চেষ্টা করুন।",
      code: "RATE_LIMIT_EXCEEDED",
    });
  },
});
