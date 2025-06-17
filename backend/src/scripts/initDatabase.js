#!/usr/bin/env node

const mongoose = require('mongoose');
const config = require('../config');
const database = require('../config/database');
const { seedDatabase } = require('../utils/seedDatabase');

async function initializeDatabase() {
    try {
        console.log('🚀 Starting database initialization...');
        
        // Connect to MongoDB
        await database.connect();
        
        // Check if database exists and has data
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`📊 Found ${collections.length} collections in database`);
        
        if (collections.length === 0) {
            console.log('📝 Database is empty, creating initial structure...');
        }
        
        // Seed the database with initial data
        await seedDatabase();
        
        // Verify database creation
        const stats = await mongoose.connection.db.stats();
        console.log('✅ Database initialization completed successfully!');
        console.log(`📈 Database stats:`);
        console.log(`   - Database: ${mongoose.connection.name}`);
        console.log(`   - Collections: ${stats.collections}`);
        console.log(`   - Data size: ${(stats.dataSize / 1024).toFixed(2)} KB`);
        console.log(`   - Storage size: ${(stats.storageSize / 1024).toFixed(2)} KB`);
        
        // List all collections
        const finalCollections = await mongoose.connection.db.listCollections().toArray();
        if (finalCollections.length > 0) {
            console.log('📋 Collections created:');
            for (const collection of finalCollections) {
                const count = await mongoose.connection.db.collection(collection.name).countDocuments();
                console.log(`   - ${collection.name}: ${count} documents`);
            }
        }
        
        console.log('\n🎉 Your NOSH database is ready to use!');
        console.log(`🔗 Connection string: ${config.mongodb.uri}`);
        
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
        process.exit(1);
    } finally {
        await database.disconnect();
        process.exit(0);
    }
}

// Run the initialization
if (require.main === module) {
    initializeDatabase();
}

module.exports = { initializeDatabase };
