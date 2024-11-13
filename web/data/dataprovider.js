const peliculas = require("./movies.json");
const usuarios = require("./users.json");

// Obtener todas las películas
function getAllPeliculas() {
    return peliculas;
}

// Obtener una película por ID
function getPelicula(id) {
    return peliculas.find(pelicula => pelicula.id === id);
}

// Validar un usuario por email y contraseña y enriquecer sus copias con datos de películas
function validateUser(email, password) {
    const user = usuarios.find(u => u.email === email && u.password === password);

    if (user) {
        // Enriquecer cada copia del usuario con detalles de la película
        for (let i = 0; i < user.copies.length; i++) {
            const copy = user.copies[i];
            const movieDetails = getPelicula(copy.id_movie);

            // Agregar los detalles de la película al objeto `copy`
            if (movieDetails) {
                copy.movieDetails = movieDetails;
            } else {
                copy.movieDetails = {}; // Si no se encuentra la película, asignar un objeto vacío
            }
        }
        return user;
    }
    return null; // Devuelve null si el usuario no existe o no coincide la contraseña
}

module.exports = {
    getAllPeliculas,
    getPelicula,
    validateUser
};
