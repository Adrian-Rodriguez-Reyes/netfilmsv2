// router.js
const express = require('express');
const router = express.Router();
const data = require("../data/dataprovider"); // Importa el dataProvider

// Redirección de la raíz a /home
router.get('/', (req, res) => {
  console.log("Ruta raíz detectada, redirigiendo a /home");
  res.redirect('/home');
});

// Ruta para renderizar la vista home
router.get('/home', (req, res) => {
  const peliculas = data.getAllPeliculas();
  res.render('home', { peliculas: peliculas });
});

// Ruta para la vista de soporte
router.get('/support', (req, res) => {
  res.render('support');
});

router.get('/singIn', (req, res) => {
  if (req.session.user) {
    return res.redirect('/userpage');
  }
  res.render('singIn', { error: null });
});

// Procesar el formulario de login
router.post('/singIn', (req, res) => {
  const { email, password } = req.body;

  // Validar el usuario con el dataProvider
  const user = data.validateUser(email, password);

  if (user) {
    // Si el usuario es válido, iniciar sesión y redirigir a /userpage
    req.session.user = user;
    res.redirect('/userpage');
  } else {
    // Si la autenticación falla, recargar la página de login con un mensaje de error
    res.render('singIn', { error: 'Email o contraseña incorrectos' });
  }
});

// Ruta para la página de usuario
router.get('/userpage', (req, res) => {
  if (req.session.user) {
    res.render('userpage', { user: req.session.user });
  } else {
    res.redirect('/singIn'); // Redirigir al login si no hay sesión activa
  }
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/singIn');
});

module.exports = router;
