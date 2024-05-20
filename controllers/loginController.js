const bcrypt = require("bcryptjs");
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
        const encryptedPassword = user.password;
        const check = bcrypt.compareSync(req.body.password, encryptedPassword);

        //Si tildó recordame => creamos la cookie.
        if (check) {
          req.session.user = user;
          if (req.body.rememberme !== undefined) {
            res.cookie("userId", user.id, { maxAge: 1000 * 60 * 5 });
          }
        } else {
          res.redirect("/login");
        }
        res.redirect("/");
      })
      .catch(function (e) {
        console.log(e);
      });
  },
  logout: function (req, res) {
    //Destruir la sessión
    req.session.destroy();

    //Destruir la coockie
    res.clearCookie("userId");

    //redireccionar a home
    res.redirect("/");
  },
};

module.exports = loginController;
