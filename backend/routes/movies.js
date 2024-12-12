const express = require("express");
const MovieController = require("../controllers/movie.js");

const router = express.Router();

// RUTAS
router.post("/create", MovieController.create);
router.get("/movies", MovieController.getAll);
router.delete("/movie/:id", MovieController.deleteOne);
router.post("/save-document", MovieController.saveDocument);
router.get("/download-document", MovieController.downloadDocument);
router.get("/check-document-exists", MovieController.checkDocumentExists);

module.exports = router;
