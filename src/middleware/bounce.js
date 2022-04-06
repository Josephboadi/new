exports.authenticate = async (req, res, next) => {
//   console.log(req.session);
//   console.log(req.session.user);
  if (!req.session || !req.session.user && req.session.cookie._expires) {
    req.flash("error_msg", "Sorry, Access Denied.");
    return res.redirect("/signin");
  }
  next();
};

