// router.js
const express = require('express');
const router = express.Router();
const data = require("../data/dataprovider"); 

router.get('/', (req, res) => {
  console.log("Ruta raíz detectada, redirigiendo a /home");
  res.redirect('/home');
});

router.get('/home', (req, res) => {
  const peliculas = data.getAllPeliculas();
  res.render('home', { peliculas: peliculas });
});

router.get('/support', (req, res) => {
  res.render('support');
});

router.get('/singIn', (req, res) => {
  if (req.session.user) {
    return res.redirect('/userpage');
  }
  res.render('singIn', { error: null });
});

router.post('/singIn', (req, res) => {
  const { email, password } = req.body;

  const user = data.validateUser(email, password);

  if (user) {
    req.session.user = user;
    res.redirect('/userpage');
  } else {
    res.render('singIn', { error: 'Incorrect email or password' });
  }
});

router.get('/userpage', (req, res) => {
  if (req.session.user) {
    res.render('userpage', { user: req.session.user });
  } else {
    res.redirect('/singIn'); 
  }
});

router.get('/movie/:id', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/singIn');
  }

  const movieId = parseInt(req.params.id);
  const userId = req.session.user.id;
  const movieDetails = data.getPelicula(movieId, userId);

  if (movieDetails) {
    const userCopy = req.session.user.copies.find(copy => copy.id_movie === movieId);

    if (userCopy) {
      res.render('movie', { movie: movieDetails });
    } else {
      console.log("Acceso denegado. La película no pertenece al usuario.");
      res.redirect('/userpage');
    }
  } else {
    console.log("Película no encontrada para ID:", movieId);
    res.redirect('/userpage');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/singIn');
});


module.exports = router;
