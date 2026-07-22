const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require('../middleware/auth');

router.post('/login', userController.loginUser);
router.post('/register', userController.createUser);

router.use(verifyToken);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.patch("/:id", userController.patchUser);
router.delete("/:id", userController.deleteUser);

module.exports = router; 