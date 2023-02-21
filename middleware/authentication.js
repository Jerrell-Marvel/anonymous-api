const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
  const { token } = req.cookies;
  console.log(req.cookies);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.user = {
      username: payload.username,
      userId: payload.userId,
    };
    next();
  } catch (err) {
    console.log("ERR");
  }
};

module.exports = authentication;
