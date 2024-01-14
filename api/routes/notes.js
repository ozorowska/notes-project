const express = require("express");

const router = express.Router();

const notesController = require("../controllers/note");

router.get("/", notesController.note_get_all);

router.post("/", notesController.note_add_new);

router.get("/user/:userId", notesController.note_get_all_for_user);

router.delete("/:id", notesController.note_delete);

router.put("/:id", notesController.note_update);

module.exports = router;
