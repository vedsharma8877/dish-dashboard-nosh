/**
 * @typedef {Object} Dish
 * @property {string} dishId - Unique identifier for the dish
 * @property {string} dishName - Name of the dish
 * @property {string} imageUrl - URL to the dish image
 * @property {boolean} isPublished - Whether the dish is published or not
 * @property {string} [createdAt] - ISO date string when dish was created
 * @property {string} [updatedAt] - ISO date string when dish was last updated
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether the request was successful
 * @property {string} [message] - Response message
 * @property {any} [data] - Response data
 * @property {Object} [error] - Error information if request failed
 */

/**
 * @typedef {Object} SocketEvents
 * @property {string} DISH_UPDATED - Event name for dish updates
 * @property {string} DISH_CREATED - Event name for new dishes
 * @property {string} DISH_DELETED - Event name for deleted dishes
 */

export const SOCKET_EVENTS = {
    DISH_UPDATED: 'dishUpdated',
    DISH_CREATED: 'dishCreated',
    DISH_DELETED: 'dishDeleted',
};

export const API_ENDPOINTS = {
    DISHES: '/dishes',
    TOGGLE_PUBLISH: (dishId) => `/dishes/${dishId}/toggle-publish`,
    DISH_BY_ID: (dishId) => `/dishes/${dishId}`,
};
