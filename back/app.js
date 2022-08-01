const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')
// Routes //
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// Connexion a mongoDB //
mongoose.connect('mongodb+srv://admin:admin@cluster0.tkexwrw.mongodb.net/piquante?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Lancement d express //
const app = express();

// Header CORS //
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });
app.use(cors())
// Permet d afficher les images //
app.use('/images', express.static(path.join(__dirname, 'images')));

// Transition en json //
app.use(express.json());

// Lancement des routes //
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;

