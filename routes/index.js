const express = require("express");
const router = express.Router();
const {
  ensureAuth,
  ensureGuest
} = require("../middleware/auth");



// @desc Login/landing page
router.get("/", ensureGuest, (req, res) => {
  res.render("Login", {
    layout: "login"
  });
});

// @des Dashboard
router.get("/dashboard", ensureAuth, (req, res) => {
  try{
const stories = await Story.find({user: req.user.id}).lean()
res.render("Dashboard", {
    name: req.user.firstName,
    stories
  });  
}catch(err){
  console.error(err);
  res.render('error/500')
  }
});

module.exports = router;
