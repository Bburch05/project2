var db = require("../models");

module.exports = function(app) {
  // Get all Posts
  app.get("/api/posts/:offset?/", function(req, res) {
    var queryOffset;
    if (!req.params.offset) {
      queryOffset = 0;
    } else {
      queryOffset = parseInt(req.params.offset);
    }

    db.Post.findAll({
      limit: 10,
      order: [["id", "DESC"]],
      offset: queryOffset,
      include: [
        {
          model: db.Users,
          attributes: ["username", "profPic", "firstName", "lastName"]
        },
        db.Comments
      ]
    }).then(function(result) {
      res.json(result);
    });
  });

  //Get the 10 most recent posts with either the ["event" or "issue"] PostType from an offset
  app.get("/api/:postType/:offset?/", function(req, res) {
    var queryOffset;
    if (!req.params.offset) {
      queryOffset = 0;
    } else {
      queryOffset = parseInt(req.params.offset);
    }

    var searchPostType = req.params.postType.toLowerCase();

    db.Post.findAll({
      limit: 10,
      order: [["id", "DESC"]],
      offset: queryOffset,
      where: {
        postType: searchPostType
      },
      include: [
        {
          model: db.Users,
          attributes: ["username", "profPic", "firstName", "lastName"]
        },
        db.Comments
      ]
    }).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api4/postsCmt/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.Users,
          attributes: ["username", "profPic", "firstName", "lastName"]
        },
        {
          model: db.Comments,
          include: {
            model: db.Users,
            attributes: ["username", "profPic", "firstName", "lastName"]
          }
        }
      ]
    }).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    db.Users.findOne({
      where: { id: req.params.id }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/users/:username", function(req, res) {
    db.Users.findOne({
      where: { username: req.params.username }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/allEvents", function(req, res) {
    db.Post.findAll({
      limit: 10,
      order: [["id", "DESC"]],
      where: { postType: "event" },
      include: [
        {
          model: db.Users,
          attributes: ["username", "profPic", "firstName", "lastName"]
        }
      ]
    }).then(function(result) {
      res.json(result);
      console.log(result);
    });
  });

  // Create a new example
  app.post("/api/posts", function(req, res) {
    console.log("Howdy");
    console.log(req.user);
    if (req.user) {
      console.log("Howdy");
      db.Post.create({
        title: req.body.title,
        text: req.body.text,
        postType: req.body.postType,
        image: req.body.image,
        address: req.body.address,
        neighborhood: req.body.neighborhood,
        UserId: req.user.id
      }).then(function(dbExample) {
        res.json(dbExample);
      });
    } else {
      res.redirect("/Log");
    }
  });

  app.post("/api/users", function(req, res) {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      email: req.body.email,
      lastName: req.body.lastName,
      neighborhood: req.body.neighborhood,
      profPic: req.body.profPic
    }).then(function(result) {
      res.json(result);
    });
  });

  app.post("/api/comments/:PostId", function(req, res) {
    if (req.user) {
      db.Comments.create({
        PostId: req.params.PostId,
        text: req.body.text,
        UserId: req.user.id
      }).then(function(result) {
        res.json(result);
      });
    } else {
      res.redirect("/Log");
    }
  });

  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: { id: req.params.id }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.delete("/api/users/:id", function(req, res) {
    console.log("user delete");
    db.Users.destroy({
      where: { id: req.params.id }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/posts/:neigh", function(req, res) {
    db.Post.findAll({
      where: {
        neighborhood: req.params.neigh
      }
    }).then(function(result) {
      res.json(result);
      console.log(result);
    });
  });

  // app.get("/postevents", function(req, res) {
  //   db.Post.findOne({
  //     where: { postType: "event" }

  //   }).then(function (result) {
  //     res.json(result);
  //     console.log("----------------------"+result);
  //   });
  // });
};
