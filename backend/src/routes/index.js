const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'NOSH API is running!',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API info endpoint
router.get('/info', (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            name: 'NOSH API',
            version: '1.0.0',
            description: 'Dish management system API',
            endpoints: {
                dishes: '/api/dishes',
                health: '/api/health',
                info: '/api/info'
            }
        }
    });
});

module.exports = router;
