const db = require("../models");
const Book = db.Book;
const { Op } = db.Sequelize;
const path = require("path");
const fs = require("fs");

// Helper untuk menghapus file secara aman (Cross-platform support)
const deleteFile = (filePath) => {
  if (!filePath) return;
  try {
    const cleanPath = filePath.replace(/^[\/\\]/, "");
    const fullPath = path.isAbsolute(cleanPath)
      ? cleanPath
      : path.join(__dirname, "..", cleanPath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

const renameBookImage = (oldPath, bookId, bookTitle) => {
  try {
    const ext = path.extname(oldPath);
    const sanitizedTitle = (bookTitle || "book")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .substring(0, 50);

    const newFilename = `${sanitizedTitle}-${bookId}${ext}`;
    const newPath = path.join(path.dirname(oldPath), newFilename);

    fs.renameSync(oldPath, newPath);
    return `/uploads/books/${newFilename}`;
  } catch (error) {
    console.error("Error renaming file:", error);
    return oldPath;
  }
};

// Helper parsing angka & boolean aman
const parseNumber = (val, defaultVal) => {
  if (val === undefined || val === null || val === "") return defaultVal;
  const parsed = Number(val);
  return isNaN(parsed) ? defaultVal : parsed;
};

const parseBoolean = (val, defaultVal = false) => {
  if (val === undefined || val === null) return defaultVal;
  if (typeof val === "boolean") return val;
  if (typeof val === "string") return val.toLowerCase() === "true" || val === "1";
  if (typeof val === "number") return val === 1;
  return defaultVal;
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const { search, is_free, language, sort_by, order } = req.query;

    let whereClause = {};

    if (search) {
      whereClause = {
        ...whereClause,
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { author: { [Op.like]: `%${search}%` } },
          { sinopsis: { [Op.like]: `%${search}%` } },
        ],
      };
    }

    if (is_free !== undefined && is_free !== "") {
      whereClause.is_free = parseBoolean(is_free);
    }

    if (language) {
      whereClause.language = language;
    }

    // PERBAIKAN: Menggunakan 'id' sebagai pengurutan default aman agar tidak error di MySQL
    let orderClause = [["id", "DESC"]];
    if (sort_by) {
      const sortOrder = order && order.toUpperCase() === "ASC" ? "ASC" : "DESC";
      orderClause = [[sort_by, sortOrder]];
    }

    const books = await Book.findAll({
      where: whereClause,
      order: orderClause,
    });

    res.json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      error: error.message,
    });
  }
};

// Get single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    await book.increment("views");
    await book.reload();

    res.json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch book",
      error: error.message,
    });
  }
};

// Create new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, rating, views, is_free, language, sinopsis, story } = req.body;

    if (!title || !author || !sinopsis || !story) {
      if (req.file) deleteFile(req.file.path);

      return res.status(400).json({
        success: false,
        message: "Title, author, sinopsis, and story are required",
      });
    }

    const bookData = {
      title: title.trim(),
      author: author.trim(),
      rating: parseNumber(rating, 0.0),
      views: parseNumber(views, 0),
      is_free: parseBoolean(is_free, false),
      language: language || "English",
      sinopsis: sinopsis.trim(),
      story: story.trim(),
      image: null,
      created_by: req.user?.email || "system",
    };

    const book = await Book.create(bookData);

    if (req.file) {
      const newImagePath = renameBookImage(req.file.path, book.id, book.title);
      await book.update({ image: newImagePath });
    }

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error creating book:", error);
    if (req.file) deleteFile(req.file.path);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create book",
      error: error.message,
    });
  }
};

// Update book (full update)
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      if (req.file) deleteFile(req.file.path);
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    const { title, author, rating, views, is_free, language, sinopsis, story } = req.body;

    const updateData = {
      title: title ? title.trim() : book.title,
      author: author ? author.trim() : book.author,
      rating: rating !== undefined ? parseNumber(rating, book.rating) : book.rating,
      views: views !== undefined ? parseNumber(views, book.views) : book.views,
      is_free: is_free !== undefined ? parseBoolean(is_free, book.is_free) : book.is_free,
      language: language || book.language,
      sinopsis: sinopsis ? sinopsis.trim() : book.sinopsis,
      story: story ? story.trim() : book.story,
      updated_by: req.user?.email || "system",
    };

    const oldImage = book.image;

    if (req.file) {
      const newImagePath = renameBookImage(req.file.path, book.id, updateData.title);
      updateData.image = newImagePath;
    }

    // Update database terlebih dahulu
    await book.update(updateData);

    // Jika update sukses dan ada file baru, hapus file lama
    if (req.file && oldImage) {
      deleteFile(oldImage);
    }

    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    if (req.file) deleteFile(req.file.path);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map((e) => ({ field: e.path, message: e.message })),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error.message,
    });
  }
};

// Patch book (partial update)
exports.patchBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      if (req.file) deleteFile(req.file.path);
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    const updateData = { ...req.body };

    if (updateData.is_free !== undefined) {
      updateData.is_free = parseBoolean(updateData.is_free);
    }
    if (updateData.rating !== undefined) {
      updateData.rating = parseNumber(updateData.rating, book.rating);
    }
    if (updateData.views !== undefined) {
      updateData.views = parseNumber(updateData.views, book.views);
    }

    updateData.updated_by = req.user?.email || "system";

    const oldImage = book.image;

    if (req.file) {
      const titleForFilename = updateData.title || book.title;
      const newImagePath = renameBookImage(req.file.path, book.id, titleForFilename);
      updateData.image = newImagePath;
    }

    await book.update(updateData);

    if (req.file && oldImage) {
      deleteFile(oldImage);
    }

    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    if (req.file) deleteFile(req.file.path);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map((e) => ({ field: e.path, message: e.message })),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error.message,
    });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    if (book.image) {
      deleteFile(book.image);
    }

    await book.destroy();

    res.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error.message,
    });
  }
};

// Get books statistics
exports.getStatistics = async (req, res) => {
  try {
    const totalBooks = await Book.count();
    const freeBooks = await Book.count({ where: { is_free: true } });
    const paidBooks = await Book.count({ where: { is_free: false } });

    const languages = await Book.findAll({
      attributes: [
        "language",
        [db.Sequelize.fn("COUNT", db.Sequelize.col("language")), "count"],
      ],
      group: ["language"],
    });

    const topRated = await Book.findAll({
      order: [["rating", "DESC"]],
      limit: 5,
    });

    const mostViewed = await Book.findAll({
      order: [["views", "DESC"]],
      limit: 5,
    });

    res.json({
      success: true,
      data: {
        total_books: totalBooks,
        free_books: freeBooks,
        paid_books: paidBooks,
        languages: languages,
        top_rated: topRated,
        most_viewed: mostViewed,
      },
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
      error: error.message,
    });
  }
};