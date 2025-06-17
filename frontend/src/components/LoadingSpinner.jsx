import React from 'react';
import { cn } from '../utils';

const LoadingSpinner = ({ size = 'medium', className, text }) => {
    const sizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-6 h-6 sm:w-8 sm:h-8',
        large: 'w-8 h-8 sm:w-12 sm:h-12',
    };

    return (
        <div className={cn("flex flex-col items-center justify-center space-y-2 sm:space-y-3", className)}>
            <div
                className={cn(
                    "loading-spinner border-4 border-gray-300 dark:border-gray-600 border-t-blue-500 dark:border-t-blue-400 rounded-full",
                    sizeClasses[size]
                )}
            />
            {text && (
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 animate-pulse text-center px-4">{text}</p>
            )}
        </div>
    );
};

export default LoadingSpinner;
