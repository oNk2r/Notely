import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const result = await ratelimit.limit(req.ip);
    if (!result.allowed) {
      return res.status(429).json({ error: "Too many requests" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default rateLimiter;
