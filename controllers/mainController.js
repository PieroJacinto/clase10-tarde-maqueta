const db = require("../database/models"); 

const mainController = {
  index: function (req, res) {
    db.Movie.findAll()
      .then(function (data) {
        res.render("index", { movies: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

module.exports = mainController;
