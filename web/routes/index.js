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
    res.render('singIn', { error: 'Email o contraseña incorrectos' });
  }
});

router.get('/userpage', (req, res) => {
  if (req.session.user) {
    res.render('userpage', { user: req.session.user });
  } else {
    res.redirect('/singIn'); 
  }
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/singIn');
});

module.exports = router;
