const express = require("express");
const router = express.Router();

// @desc Login/landing page
router.get("/", (req, res) => {
  res.render("Login", {
    layout: "login"
  });
});

// @des Dashboard
router.get("/dashboard", (req, res) => {
  res.render("Dashboard");
});

module.exports = router;
