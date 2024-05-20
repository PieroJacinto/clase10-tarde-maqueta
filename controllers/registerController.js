const bcrypt = require("bcryptjs");
const db = require("../database/models");
const op = db.Sequelize.Op;
const users = db.User;

let registerController = {
  index: function (req, res) {
    //Mostrar el formulario de registro
    return res.render("register");
  },
  store: function (req, res) {
    // Guardar un usuario en la db
    const user = {
      name: req.body.name,
      email: req.body.email,
      //password: req.body.password, //TODO: Agregar bcrypt.
      password: bcrypt.hashSync(req.body.password, 10), //TODO: Agregar bcrypt.
    };

    users
      .create(user)
      .then(function (user) {
        return res.redirect("/login");
      })
      .catch(function (err) {
        console.log("Error al grabar el usuario", err);
      });
  },
};

module.exports = registerController;
