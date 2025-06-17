const fs = require('fs').promises;
const path = require('path');
const Dish = require('../models/Dish');

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // Check if dishes already exist
        const existingDishes = await Dish.countDocuments();
        if (existingDishes > 0) {
            console.log(`📊 Database already has ${existingDishes} dishes. Skipping seed.`);
            return;
        }

        // Read the dish data from JSON file
        const dataPath = path.join(__dirname, '../../../dish-assignment.json');
        const rawData = await fs.readFile(dataPath, 'utf8');
        const dishesData = JSON.parse(rawData);

        // Insert dishes into database
        const dishes = await Dish.insertMany(dishesData);

        console.log(`✅ Successfully seeded ${dishes.length} dishes into the database`);
        console.log('📋 Seeded dishes:');
        dishes.forEach(dish => {
            console.log(`   - ${dish.dishName} (ID: ${dish.dishId}) - ${dish.isPublished ? 'Published' : 'Unpublished'}`);
        });

        return dishes;
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
};

module.exports = { seedDatabase };
