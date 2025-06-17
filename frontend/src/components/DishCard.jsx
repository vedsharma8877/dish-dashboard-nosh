import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { EyeIcon, EyeSlashIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { cn, formatDishName, validateImageUrl } from '../utils';

const DishCard = ({ dish, onTogglePublish, isUpdating }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const handleToggle = async () => {
        try {
            await onTogglePublish(dish.dishId);
        } catch (error) {
            console.error('Failed to toggle publish status:', error);
        }
    };

    const handleImageLoad = () => {
        setImageLoading(false);
        setImageError(false);
    };

    const handleImageError = () => {
        setImageLoading(false);
        setImageError(true);
    };

    const isValidImage = validateImageUrl(dish.imageUrl);

    return (
        <div className="dish-card bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/40 transition-all duration-300 h-72 sm:h-80 flex flex-col border dark:border-gray-700">
            {/* Image Section */}
            <div className="relative h-40 sm:h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                {isValidImage && !imageError ? (
                    <>
                        {imageLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="loading-spinner w-6 h-6 sm:w-8 sm:h-8 border-4 border-gray-300 dark:border-gray-600 border-t-blue-500 dark:border-t-blue-400 rounded-full"></div>
                            </div>
                        )}
                        <img
                            src={dish.imageUrl}
                            alt={dish.dishName}
                            className={cn(
                                "w-full h-full object-cover transition-opacity duration-300",
                                imageLoading ? "opacity-0" : "opacity-100"
                            )}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                        />
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                        <PhotoIcon className="w-10 h-10 sm:w-12 sm:h-12" />
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <span
                        className={cn(
                            "inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-xs font-medium",
                            dish.isPublished
                                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        )}
                    >
                        {dish.isPublished ? (
                            <>
                                <EyeIcon className="w-3 h-3 mr-1" />
                                <span>Published</span>
                            </>
                        ) : (
                            <>
                                <EyeSlashIcon className="w-3 h-3 mr-1" />
                                <span>Draft</span>
                            </>
                        )}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between">
                <div className="flex items-start justify-between">
                    <div className="flex-1 min-h-[2.5rem] sm:min-h-[3rem]">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 leading-tight">
                            {formatDishName(dish.dishName)}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            ID: {dish.dishId}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-3 sm:mt-4">
                    <span className={cn(
                        "text-xs sm:text-sm font-medium",
                        dish.isPublished
                            ? "text-green-700 dark:text-green-300"
                            : "text-gray-600 dark:text-gray-400"
                    )}>
                        {dish.isPublished ? 'Published' : 'Draft'}
                    </span>
                    {/* Toggle Switch */}
                    <div className="flex items-center">
                        <Switch
                            checked={dish.isPublished}
                            onChange={handleToggle}
                            disabled={isUpdating}
                            className={cn(
                                "toggle-switch relative inline-flex items-center rounded-full transition-colors flex-shrink-0",
                                "w-9 h-5 sm:w-11 sm:h-6",
                                dish.isPublished ? "bg-green-600 dark:bg-green-700" : "bg-gray-200 dark:bg-gray-600",
                                isUpdating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                            )}
                        >
                            <span
                                className={cn(
                                    "inline-block transform rounded-full bg-white transition-transform flex-shrink-0",
                                    "h-3 w-3 sm:h-4 sm:w-4",
                                    dish.isPublished
                                        ? "translate-x-5 sm:translate-x-6"
                                        : "translate-x-1"
                                )}
                            />
                        </Switch>
                    </div>
                </div>

                {/* Loading overlay */}
                {isUpdating && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-xl">
                        <div className="loading-spinner w-5 h-5 sm:w-6 sm:h-6 border-4 border-gray-300 border-t-blue-500 rounded-full"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DishCard;
