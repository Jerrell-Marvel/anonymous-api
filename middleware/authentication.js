const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");
const authentication = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthorizedError("No token provided");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      username: payload.username,
      userId: payload.userId,
    };
    next();
  } catch (err) {
    throw new UnauthorizedError("Failed to authenticate token (token might be invalid)");
  }
};

module.exports = authentication;
