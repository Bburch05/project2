var db = require("../models");

module.exports = function(app, passport) {
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/",

      failureRedirect: "/Log"
    })
  );

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/",
      failureRedirect: "/"
    })
  );

  app.get('/logout', function(req,res){
    req.session.destroy(function(err) {

      res.redirect('/');
  });
  });
};