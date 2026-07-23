const jwt = require('jsonwebtoken'); 
 
exports.verifyToken = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token is required",
      });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            success: false,
            message: "Token has expired",
          });
        }
        return res.status(403).json({
          success: false,
          message: "Invalid token",
        });
      }

      // Save user info to request
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(500).json({
      success: false,
      message: "Failed to authenticate token",
      error: error.message,
    });
  }
};

exports.checkUserActive = async (req, res, next) => {
  try {
    const db = require("../models");
    const User = db.User;

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: "Account is inactive",
      });
    }

    next();
  } catch (error) {
    console.error("Error checking user status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify user status",
      error: error.message,
    });
  }
};