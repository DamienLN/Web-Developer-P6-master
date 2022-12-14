// Require //
const express = require('express');
const router = express.Router();

// Middleware //
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

//  Controllers //
const sauceCtrl = require('../controllers/sauce');

// Router //
router.get('', auth, sauceCtrl.getAllSauce);
router.post('', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeOrNot)

module.exports = router;