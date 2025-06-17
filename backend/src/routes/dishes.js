const express = require('express');
const router = express.Router();

const {
    getAllDishes,
    getDishById,
    createDish,
    updateDish,
    togglePublishedStatus,
    deleteDish,
    getPublishedDishes
} = require('../controllers/dishController');

const {
    dishValidationRules,
    dishIdValidationRules,
    validate
} = require('../middleware/validation');

// @route   GET /api/dishes
// @desc    Get all dishes with optional filtering and sorting
// @access  Public
router.get('/', getAllDishes);

// @route   GET /api/dishes/published
// @desc    Get only published dishes
// @access  Public
router.get('/published', getPublishedDishes);

// @route   GET /api/dishes/:id
// @desc    Get single dish by dishId
// @access  Public
router.get('/:id', dishIdValidationRules(), validate, getDishById);

// @route   POST /api/dishes
// @desc    Create new dish
// @access  Public (should be protected in production)
router.post('/', dishValidationRules(), validate, createDish);

// @route   PUT /api/dishes/:id
// @desc    Update dish
// @access  Public (should be protected in production)
router.put('/:id',
    dishIdValidationRules(),
    dishValidationRules().map(rule => rule.optional()), // Make all fields optional for update
    validate,
    updateDish
);

// @route   PATCH /api/dishes/:id/toggle-publish
// @desc    Toggle dish published status
// @access  Public (should be protected in production)
router.patch('/:id/toggle-publish',
    dishIdValidationRules(),
    validate,
    togglePublishedStatus
);

// @route   DELETE /api/dishes/:id
// @desc    Delete dish
// @access  Public (should be protected in production)
router.delete('/:id', dishIdValidationRules(), validate, deleteDish);

module.exports = router;
