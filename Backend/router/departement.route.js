const DeptController = require('../controller/departement.controller');
const express = require('express');
const router = express.Router();

// Route pour créer un département
router.post('/', DeptController.create);

// Route pour récupérer tous les départements
router.get('/', DeptController.getAll);

// Route pour modifier un département
router.put('/:id', DeptController.modifier);

// Route pour supprimer un département
router.delete('/:id', DeptController.supprimer);

// Exporter le routeur
module.exports = router;
