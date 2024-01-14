const Note = require("../models/note");

// ---Wyświetlanie wszystkich notatek---

exports.note_get_all = (req, res, next) => {
  Note.find()
    .then((result) => {
      res.status(200).json({
        message: "List of all notes",
        info: result,
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Error",
        error: err,
      })
    );
};

// ---Dodawanie nowej notatki---

exports.note_add_new = (req, res, next) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    date: new Date(),
    user: req.body.userId,
  });

  note
    .save()
    .then((result) => {
      res.status(201).json({
        wiadomosc: "New note created",
        info: result,
      });
    })
    .catch((err) => res.status(500).json(err));
};

// ---Usuwanie notatki---

exports.note_delete = (req, res, next) => {
  const id = req.params.id;
  Note.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({
        message: "The note is deleted: " + id,
      });
    })
    .catch((err) => res.status(500).json(err));
};

// ---Edycja notatki---

exports.note_update = (req, res, next) => {
  const id = req.params.id;
  Note.findByIdAndUpdate(id, {
    title: req.body.title,
    content: req.body.content,
    date: new Date(),
  })
    .then(() => {
      res.status(200).json({
        wiadomosc: "Updating the note:  " + id,
      });
    })
    .catch((err) => res.status(500).json(err));
};

// ---Wyświetlanie wszystkich notatek dla uzytkownika---

exports.note_get_all_for_user = (req, res, next) => {
  const userId = req.params.userId;

  Note.find({ user: userId })
    .then((notes) => {
      res.status(200).json({
        message: `List of all notes for user ${userId}`,
        info: notes,
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Error fetching user's notes",
        error: err,
      })
    );
};
