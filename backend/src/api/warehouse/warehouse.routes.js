const express = require('express');
const router = express.Router();
const warehouseController = require('./warehouse.controller');

// Route to add a new duck (or update quantity)
router.post('/', warehouseController.addDuck);

// Route to list all ducks
router.get('/', warehouseController.listDucks);

// Route to edit a duck's price or quantity
router.put('/:id', warehouseController.editDuck);

// Route to logically delete a duck
router.delete('/:id', warehouseController.deleteDuck);

module.exports = router;