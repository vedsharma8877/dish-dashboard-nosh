const { body, param, validationResult } = require('express-validator');

// Validation rules for dish creation/update
const dishValidationRules = () => {
    return [
        body('dishId')
            .trim()
            .notEmpty()
            .withMessage('Dish ID is required')
            .isLength({ min: 1, max: 50 })
            .withMessage('Dish ID must be between 1 and 50 characters'),

        body('dishName')
            .trim()
            .notEmpty()
            .withMessage('Dish name is required')
            .isLength({ min: 2, max: 100 })
            .withMessage('Dish name must be between 2 and 100 characters'),

        body('imageUrl')
            .trim()
            .notEmpty()
            .withMessage('Image URL is required')
            .isURL()
            .withMessage('Please provide a valid URL')
            .matches(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)
            .withMessage('Image URL must point to a valid image file'),

        body('isPublished')
            .isBoolean()
            .withMessage('isPublished must be a boolean value')
    ];
};

// Validation rules for dish ID parameter
const dishIdValidationRules = () => {
    return [
        param('id')
            .trim()
            .notEmpty()
            .withMessage('Dish ID is required')
            .isLength({ min: 1, max: 50 })
            .withMessage('Invalid dish ID format')
    ];
};

// Validation rules for toggle published status
const togglePublishedValidationRules = () => {
    return [
        param('id')
            .trim()
            .notEmpty()
            .withMessage('Dish ID is required'),

        body('isPublished')
            .isBoolean()
            .withMessage('isPublished must be a boolean value')
    ];
};

// Middleware to check validation results
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(error => ({
                field: error.param,
                message: error.msg,
                value: error.value
            }))
        });
    }
    next();
};

module.exports = {
    dishValidationRules,
    dishIdValidationRules,
    togglePublishedValidationRules,
    validate
};
