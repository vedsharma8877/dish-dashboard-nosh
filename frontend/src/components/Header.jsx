import React from 'react';
import socketService from '../services/socket';
import {
    SignalIcon,
    SignalSlashIcon,
    EyeIcon,
    EyeSlashIcon
} from '@heroicons/react/24/outline';
import { cn } from '../utils';
import DarkModeToggle from './DarkModeToggle';

const Header = ({ dishCount, publishedCount }) => {
    // Get connection status directly from socket service instead of using hook
    const connected = socketService.socket?.connected || false;

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Mobile Layout */}
                <div className="lg:hidden">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <img
                                src="https://static.wixstatic.com/media/8f884e_a569604e943a474584a15e6f151723e3~mv2.png/v1/fill/w_207,h_73,al_c,lg_1/8f884e_a569604e943a474584a15e6f151723e3~mv2.png"
                                alt="NOSH Logo"
                                className="h-8 w-auto"
                            />
                        </div>

                        {/* Controls - Mobile */}
                        <div className="flex items-center space-x-3">
                            {/* Connection Status - Mobile */}
                            <div
                                className={cn(
                                    "flex items-center space-x-1 px-2 py-1 rounded-lg",
                                    connected
                                        ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                        : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                )}
                            >
                                {connected ? (
                                    <SignalIcon className="w-4 h-4" />
                                ) : (
                                    <SignalSlashIcon className="w-4 h-4" />
                                )}
                                <span className="text-xs font-medium">
                                    {connected ? 'Online' : 'Offline'}
                                </span>
                            </div>

                            {/* Dark Mode Toggle */}
                            <DarkModeToggle />
                        </div>
                    </div>

                    {/* Stats Row - Mobile */}
                    <div className="pb-4">
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                                    <EyeIcon className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                    <span className="text-blue-900 dark:text-blue-300 font-medium">{publishedCount}</span>
                                </div>
                                <div className="flex items-center space-x-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded">
                                    <EyeSlashIcon className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                    <span className="text-gray-900 dark:text-gray-300 font-medium">{dishCount - publishedCount}</span>
                                </div>
                            </div>
                            <div className="text-gray-500 dark:text-gray-400">
                                Total: {dishCount}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex justify-between items-center py-6">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <img
                                src="https://static.wixstatic.com/media/8f884e_a569604e943a474584a15e6f151723e3~mv2.png/v1/fill/w_207,h_73,al_c,lg_1/8f884e_a569604e943a474584a15e6f151723e3~mv2.png"
                                alt="NOSH Logo"
                                className="h-10 w-auto"
                            />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Dish Management Dashboard
                            </p>
                        </div>
                    </div>

                    {/* Stats and Status */}
                    <div className="flex items-center space-x-6">
                        {/* Dish Statistics */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-2 rounded-lg">
                                <EyeIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                                    {publishedCount} Published
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
                                <EyeSlashIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {dishCount - publishedCount} Draft
                                </span>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Total: {dishCount}
                            </div>
                        </div>

                        {/* Connection Status and Dark Mode */}
                        <div className="flex items-center space-x-4">
                            <div
                                className={cn(
                                    "flex items-center space-x-2 px-3 py-2 rounded-lg",
                                    connected
                                        ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                        : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                )}
                            >
                                {connected ? (
                                    <>
                                        <SignalIcon className="w-5 h-5" />
                                        <span className="text-sm font-medium">Connected</span>
                                    </>
                                ) : (
                                    <>
                                        <SignalSlashIcon className="w-5 h-5" />
                                        <span className="text-sm font-medium">Disconnected</span>
                                    </>
                                )}
                            </div>

                            {/* Dark Mode Toggle */}
                            <DarkModeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
