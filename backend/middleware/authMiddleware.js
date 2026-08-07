const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    console.log("Headers:", req.headers);

    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        message: "No Authorization Header",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:", token);
    console.log("Secret:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);

    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = verifyToken;
