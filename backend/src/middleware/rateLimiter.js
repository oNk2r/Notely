import ratelimit from "../config/upstash.js";

const rateLimiter = (req, res, next) => {
  // Only rate limit POST, PUT, DELETE requests
  // Allow GET requests freely
  if (req.method === "GET") {
    return next();
  }

  ratelimit.limit(req.ip).then((result) => {
    if (!result.allowed) {
      return res.status(429).json({ error: "Too many requests" });
    }
    next();
  }).catch((error) => {
    next(error);
  });
};

export default rateLimiter;
