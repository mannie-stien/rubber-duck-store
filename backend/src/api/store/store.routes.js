const express = require('express');
const router = express.Router();
const storeController = require('./store.controller');

// The single endpoint for creating/processing an order
router.post('/orders', storeController.createOrder);

module.exports = router;