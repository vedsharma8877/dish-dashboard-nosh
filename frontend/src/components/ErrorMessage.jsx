import React from 'react';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { cn } from '../utils';

const ErrorMessage = ({
    error,
    onRetry,
    className,
    title = "Something went wrong",
    showRetry = true
}) => {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center space-y-3 sm:space-y-4 p-4 sm:p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800",
            className
        )}>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <ExclamationTriangleIcon className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 dark:text-red-400" />
                <h3 className="text-base sm:text-lg font-semibold text-red-900 dark:text-red-200 text-center">{title}</h3>
            </div>

            {error && (
                <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 text-center max-w-md px-2">
                    {error}
                </p>
            )}

            {showRetry && onRetry && (
                <button
                    onClick={onRetry}
                    className="inline-flex items-center space-x-2 px-3 py-2 sm:px-4 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors text-sm w-full sm:w-auto justify-center"
                >
                    <ArrowPathIcon className="w-4 h-4" />
                    <span>Try Again</span>
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
