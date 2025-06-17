const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const config = require('./config');
const database = require('./config/database');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Import routes
const indexRoutes = require('./routes/index');
const dishRoutes = require('./routes/dishes');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server, {
    cors: {
        origin: config.socket.corsOrigin,
        methods: ['GET', 'POST']
    }
});

// Make io globally available for real-time updates
global.io = io;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: config.cors.origins,
    credentials: config.cors.credentials
}));

// Compression middleware
app.use(compression());

// Rate limiting
const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.'
    }
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (config.nodeEnv === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Routes
app.use('/api', indexRoutes);
app.use('/api/dishes', dishRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log(`🔌 New client connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`🔌 Client disconnected: ${socket.id}`);
    });

    // Join a room for dish updates
    socket.on('joinDishUpdates', () => {
        socket.join('dishUpdates');
        socket.emit('joinedDishUpdates', { message: 'Successfully joined dish updates' });
    });

    // Leave the dish updates room
    socket.on('leaveDishUpdates', () => {
        socket.leave('dishUpdates');
        socket.emit('leftDishUpdates', { message: 'Left dish updates' });
    });
});

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Database connection and server startup
const startServer = async () => {
    try {
        // Connect to database
        await database.connect();

        // Start server
        server.listen(config.port, () => {
            console.log(`🚀 Server running on port ${config.port} in ${config.nodeEnv} mode`);
            console.log(`📱 Socket.IO server ready for real-time updates`);
            console.log(`🌐 API Base URL: http://localhost:${config.port}/api`);
            console.log(`📋 API Documentation: http://localhost:${config.port}/api/info`);
            console.log(`💾 Run "npm run db:seed" to initialize database with sample data`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('🛑 SIGTERM received, shutting down gracefully');
    server.close(() => {
        database.disconnect();
        process.exit(0);
    });
});

process.on('SIGINT', async () => {
    console.log('🛑 SIGINT received, shutting down gracefully');
    server.close(() => {
        database.disconnect();
        process.exit(0);
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
    server.close(() => {
        process.exit(1);
    });
});

// Start the server
startServer();

module.exports = app;
