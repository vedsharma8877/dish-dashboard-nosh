const mongoose = require('mongoose');
const config = require('./index');

class Database {
    constructor() {
        this.connection = null;
    }

    async connect() {
        try {
            const uri = config.nodeEnv === 'test' ? config.mongodb.testUri : config.mongodb.uri;

            this.connection = await mongoose.connect(uri, config.mongodb.options);

            console.log(`✅ MongoDB connected successfully to ${uri}`);

            // Handle connection events
            mongoose.connection.on('error', (err) => {
                console.error('❌ MongoDB connection error:', err);
            });

            mongoose.connection.on('disconnected', () => {
                console.log('⚠️  MongoDB disconnected');
            });

            // Graceful shutdown
            process.on('SIGINT', () => {
                this.disconnect();
            });

            return this.connection;
        } catch (error) {
            console.error('❌ MongoDB connection failed:', error);
            process.exit(1);
        }
    }

    async disconnect() {
        try {
            if (this.connection) {
                await mongoose.connection.close();
                console.log('✅ MongoDB connection closed');
            }
        } catch (error) {
            console.error('❌ Error closing MongoDB connection:', error);
        }
    }

    async dropDatabase() {
        try {
            if (config.nodeEnv === 'test') {
                await mongoose.connection.dropDatabase();
                console.log('✅ Test database dropped');
            }
        } catch (error) {
            console.error('❌ Error dropping database:', error);
        }
    }
}

module.exports = new Database();
