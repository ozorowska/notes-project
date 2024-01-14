const express = require("express");
const router = express.Router();
const path = require("path");
const checkAuth = require("../middleware/checkAuth");

// Główna trasa - Strona Główna
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../", "index.html"));
});

// Trasa do pulpitu z notatkami

router.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../../views", "dashboard.html"));
});

// Trasa logowania
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../views", "login.html"));
});

// Trasa rejestracji
router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../../views", "registration.html"));
});

module.exports = router;
