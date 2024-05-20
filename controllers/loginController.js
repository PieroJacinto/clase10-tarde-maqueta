const db = require("../database/models");
const users = db.User;

const op = db.Sequelize.Op;

let loginController = {
  index: function (req, res) {
    //Mostramos el form de login
    return res.render("login");
  },
  login: function (req, res) {
    // Buscar el usuario que se quiere loguear.
    users
      .findOne({
        where: [{ email: req.body.email }],
      })
      .then(function (user) {
        req.session.user = user;
        res.redirect("/");
      })
      .catch(function (e) {
        console.log(e);
      });

    //Si tildó recordame => creamos la cookie.
  },
  logout: function (req, res) {
    //Destruir la sessión
    //Destruir la coockie
    //redireccionar a home
  },
};

module.exports = loginController;
