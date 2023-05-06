const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const passport = require("passport");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      //회원가입후 자동 로그인
      req.login(registeredUser, (error) => {
        if (error) return next(error);
        req.flash("success", "welcome to yelp camp");
        res.redirect("/campgrounds");
      });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "welcome back");
    const redirectUrl = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
});

module.exports = router;
