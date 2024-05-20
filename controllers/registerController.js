const db = require('../database/models');
const op = db.Sequelize.Op;
const users = db.User;

let registerController = {
    index: function(req, res){
        //Mostrar el formulario de registro
        return res.render('register');
    },
    store: function(req, res){ 
        // Guardar un usuario en la db
       
    }
}

module.exports = registerController;