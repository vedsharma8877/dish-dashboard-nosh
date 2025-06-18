require('dotenv').config();

const config = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nosh_db',
        testUri: process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/nosh_test_db',
        options: {
            // Modern MongoDB driver doesn't need these deprecated options
        }
    },
    cors: {
        origins: process.env.ALLOWED_ORIGINS ?
            process.env.ALLOWED_ORIGINS.split(',') :
            [
                'http://localhost:3000',
                'http://localhost:5173',
                'https://dish-dashboard-nosh.vercel.app',
                'https://nosh-frontend.onrender.com'
            ],
        credentials: true
    },
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
        max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
    },
    socket: {
        corsOrigin: process.env.SOCKET_CORS_ORIGIN || [
            'http://localhost:3000',
            'http://localhost:5173',
            'https://dish-dashboard-nosh.vercel.app',
            'https://nosh-frontend.onrender.com'
        ]
    }
};

module.exports = config;
