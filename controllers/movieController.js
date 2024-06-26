const db = require('../database/models'); //Requerimos la conexión a la base de datos y todos los modelos.
const op = db.Sequelize.Op

const movieController = {
    show: function(req, res){
       // Debera mostrar el detalle de una pelicula
       const id = req.params.id;
       db.Movie.findByPk(id)
        .then( function (data) {
            res.render("movie", {movie: data})
        })
        .catch( function (error) {
            console.log(error)
        })
        
    } ,
    new: function(req, res){
        //últimas 5 películas ordenadas según su fecha de estreno. Cada título de película deberá ser un hipervínculo para ver el detalle de la misma.
        db.Movie.findAll({
            order: [
                ["release_date", "DESC"]
            ],
            limit: 5,
        })
        .then( function (data) {
            return res.render("new", {movies:data})
        })
        .catch( function(error){
            console.log(error)
        })
    },
    recomended: function(req, res){
        // Deberá mostrar las películas cuyo rating sea mayor o igual a 8. Cada título de película deberá ser un hipervínculo para ver el detalle de la misma.
        db.Movie.findAll({
            where: [
                { rating: {[op.gte]: 8}}
            ],
            order:[
                ['rating', 'DESC']
            ]
        })
            .then(data =>{
                return res.render('new', { movies : data, title: 'Recomendadas'})
            })
            .catch( error => {
                console.log(error);
            })
    },
    search: function(req, res){
       // buscador funcionando con querystrings
       let infoABuscar = req.query.search; //obtengo la info de la querystring.

       db.Movie.findAll({
           //SELECT * FROM movies
           //WHERE title LIKE "%potter%"
           where: [
               { title: {[op.like]: '%'+infoABuscar+'%'}}
           ]})
           .then( data => {
               return res.render('index',{movies: data});
           })
           .catch( error => {
               console.log(error);
           })
    },
    create: function(req, res){
       //Mostrar formulario de carga de películas
        db.Genre.findAll()
            .then( data => {
                return res.render('movieNew', {genres:data});
            })
            .catch(error => {
                console.log(error);
            })
    },
    store: function(req, res){
        // Debera guardar una pelicula en la db 
         //Método para guardar nueva película.
        //1) Obtener datos del formulario
        let data = req.body;
        
        //2)Crear pelicula nueva.
        let movie = {
            title: data.title,            
            rating: data.rating,
            awards: data.awards,
            release_date: data.release_date,
            length: data.length,
            genre_id: data.genre_id
        }
        //3)Guardar película
        db.Movie.create(movie)
            .then( (movieCreada) => {
        //4)Redirección
                return res.redirect('/');
            })
            .catch(error => {
                console.log(error);
            })       
    },
    destroy: function(req, res){
        // Debera destruir una pelicula segun su id.    
        let movieABorrar = req.params.id;
        
        db.Movie.destroy({
            where: [
                {id : movieABorrar}
            ]
        })
            .then( () => {
                 return res.redirect('/');
            })
            .catch( error => { 
                console.log(error);
            })   
    }
}

module.exports = movieController