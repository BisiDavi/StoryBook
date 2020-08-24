const express = require("express");
const passport = require("passport");
const router = express.Router();

// @desc Auth with Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// @des Googel auth callback
// @route  GET /auth/google/callback

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

module.exports = router;
