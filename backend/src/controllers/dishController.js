const Dish = require('../models/Dish');

// @desc    Get all dishes
// @route   GET /api/dishes
// @access  Public
const getAllDishes = async (req, res, next) => {
    try {
        const { published, search, sortBy = 'createdAt', order = 'desc' } = req.query;

        // Build query
        let query = {};

        // Filter by published status
        if (published !== undefined) {
            query.isPublished = published === 'true';
        }

        // Search by dish name
        if (search) {
            query.dishName = { $regex: search, $options: 'i' };
        }

        // Build sort object
        const sortOrder = order === 'asc' ? 1 : -1;
        const sort = { [sortBy]: sortOrder };

        const dishes = await Dish.find(query).sort(sort);

        res.status(200).json({
            success: true,
            count: dishes.length,
            data: dishes
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single dish
// @route   GET /api/dishes/:id
// @access  Public
const getDishById = async (req, res, next) => {
    try {
        const dish = await Dish.findOne({ dishId: req.params.id });

        if (!dish) {
            return res.status(404).json({
                success: false,
                message: 'Dish not found'
            });
        }

        res.status(200).json({
            success: true,
            data: dish
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new dish
// @route   POST /api/dishes
// @access  Public (in production, this should be protected)
const createDish = async (req, res, next) => {
    try {
        const { dishId, dishName, imageUrl, isPublished = true } = req.body;

        const dish = await Dish.create({
            dishId,
            dishName,
            imageUrl,
            isPublished
        });

        res.status(201).json({
            success: true,
            message: 'Dish created successfully',
            data: dish
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update dish
// @route   PUT /api/dishes/:id
// @access  Public (in production, this should be protected)
const updateDish = async (req, res, next) => {
    try {
        const { dishName, imageUrl, isPublished } = req.body;

        const dish = await Dish.findOne({ dishId: req.params.id });

        if (!dish) {
            return res.status(404).json({
                success: false,
                message: 'Dish not found'
            });
        }

        // Update fields if provided
        if (dishName !== undefined) dish.dishName = dishName;
        if (imageUrl !== undefined) dish.imageUrl = imageUrl;
        if (isPublished !== undefined) dish.isPublished = isPublished;

        await dish.save();

        res.status(200).json({
            success: true,
            message: 'Dish updated successfully',
            data: dish
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle dish published status
// @route   PATCH /api/dishes/:id/toggle-published
// @access  Public (in production, this should be protected)
const togglePublishedStatus = async (req, res, next) => {
    try {
        const dish = await Dish.findOne({ dishId: req.params.id });

        if (!dish) {
            return res.status(404).json({
                success: false,
                message: 'Dish not found'
            });
        }

        // Toggle the published status
        dish.isPublished = !dish.isPublished;
        await dish.save();

        // Emit real-time update to all connected clients
        if (global.io) {
            global.io.emit('dishUpdated', dish);
        }

        res.status(200).json({
            success: true,
            message: `Dish ${dish.isPublished ? 'published' : 'unpublished'} successfully`,
            data: dish
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete dish
// @route   DELETE /api/dishes/:id
// @access  Public (in production, this should be protected)
const deleteDish = async (req, res, next) => {
    try {
        const dish = await Dish.findOne({ dishId: req.params.id });

        if (!dish) {
            return res.status(404).json({
                success: false,
                message: 'Dish not found'
            });
        }

        await Dish.deleteOne({ dishId: req.params.id });

        // Emit real-time update
        if (global.io) {
            global.io.emit('dishDeleted', {
                action: 'deleted',
                dishId: req.params.id
            });
        }

        res.status(200).json({
            success: true,
            message: 'Dish deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get published dishes
// @route   GET /api/dishes/published
// @access  Public
const getPublishedDishes = async (req, res, next) => {
    try {
        const dishes = await Dish.findPublished().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: dishes.length,
            data: dishes
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllDishes,
    getDishById,
    createDish,
    updateDish,
    togglePublishedStatus,
    deleteDish,
    getPublishedDishes
};
