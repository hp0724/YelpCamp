const User = require("../models/user");
const passport = require("passport");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};
module.exports.register = async (req, res, next) => {
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
};
module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};
module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = req.session.returnTo || "/campgrounds";

  delete req.session.returnTo; // 사용한 후, 세션에서 해당 값을 삭제
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout(() => {
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
};
