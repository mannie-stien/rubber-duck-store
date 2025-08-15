const express = require('express');
const cors = require('cors');

// Import my  routes
const warehouseRoutes = require('./api/warehouse/warehouse.routes');
const storeRoutes = require('./api/store/store.routes');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/', (req, res) => {
  res.send('Rubber Duck Store API is running...');
});

// --- API routes ---
app.use('/api/warehouse', warehouseRoutes);
app.use('/api/store', storeRoutes);

module.exports = app;