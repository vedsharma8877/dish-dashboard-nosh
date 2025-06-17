import React from 'react';
import { Switch } from '@headlessui/react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../utils';

const DarkModeToggle = ({ className }) => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <Switch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            className={cn(
                "relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0",
                "h-5 w-9 sm:h-6 sm:w-11",
                isDarkMode
                    ? "bg-blue-600 focus:ring-blue-500"
                    : "bg-gray-200 focus:ring-gray-300",
                "dark:focus:ring-offset-gray-800",
                className
            )}
        >
            <span
                className={cn(
                    "flex transform rounded-full bg-white transition-transform flex-shrink-0 items-center justify-center",
                    "h-3 w-3 sm:h-4 sm:w-4",
                    isDarkMode ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
                )}
            >
                {isDarkMode ? (
                    <MoonIcon className="h-2 w-2 sm:h-3 sm:w-3 text-blue-600" />
                ) : (
                    <SunIcon className="h-2 w-2 sm:h-3 sm:w-3 text-yellow-500" />
                )}
            </span>
        </Switch>
    );
};

export default DarkModeToggle;
