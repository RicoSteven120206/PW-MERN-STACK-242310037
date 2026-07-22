const express = require('express');
const router = express.Router();
const bookController = require("../controllers/bookController");
const upload = require("../middleware/upload");
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

//CRUD Routes
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.delete("/:id", bookController.deleteBook);

router.post("/", upload.single("coverImage"), bookController.createBook);
router.put("/:id", upload.single("coverImage"), bookController.updateBook);
router.patch("/:id", upload.single("coverImage"), bookController.patchBook);

module.exports = router;