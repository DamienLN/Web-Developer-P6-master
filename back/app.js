const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')
const rateLimit = require("express-rate-limit")
// Routes //
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// Connexion a mongoDB //
mongoose.connect('mongodb+srv://admin:admin@cluster0.tkexwrw.mongodb.net/piquante?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 1000, // a modifier selon la demande
  message: "Trop de tentatives de connexion. Compte bloqué pour 5 minutes"
})

// Lancement d express //
const app = express();

// Header CORS //
app.use(cors())

app.use(limiter)

// Permet d afficher les images //
app.use('/images', express.static(path.join(__dirname, 'images')));

// Transition en json //
app.use(express.json());

// Lancement des routes //
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;

