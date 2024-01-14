const User = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ---Dodawanie nowego uzytkownika---

exports.user_add_new = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => res.status(201).json({ wiadomosc: "Dodano użytkownika" }))
      .catch((err) => res.status(500).json(err));
  });
};

// ---Logowanie uzytkownika---

exports.user_login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) return res.status(403).json({ wiadomosc: "Błąd autoryzacji" });

      bcrypt.compare(req.body.password, user.password).then((result) => {
        if (!result)
          return res.status(403).json({ wiadomosc: "Błąd autoryzacji" });
        // Zalogowano => generuję token
        const token = jwt.sign({ user: user.username }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
        return res.status(200).json({
          token: token,
          userId: user.id,
          email: req.body.email,
          name: user.name,
        });
      });
    })
    .catch((err) => res.status(500).json(err));
};
