const express = require('express');
const router = express.Router();
const bookController = require("../controllers/bookController");
const upload = require("../middleware/upload");
const { verifyToken, checkUserActive } = require("../middleware/auth");

// Wrapper middleware untuk menangani error spesifik Multer (ukuran file / tipe file)
const handleUpload = (req, res, next) => {
  upload.single("coverImage")(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || "File upload error",
      });
    }
    next();
  });
};

router.use(verifyToken);

// CRUD Routes
router.get("/", bookController.getAllBooks);
router.get("/statistics", bookController.getStatistics); // HARUS di atas /:id
router.get("/:id", bookController.getBookById);
router.delete("/:id", bookController.deleteBook);

router.post("/", handleUpload, bookController.createBook);
router.put("/:id", handleUpload, bookController.updateBook);
router.patch("/:id", handleUpload, bookController.patchBook);

module.exports = router;