import React, { useState } from 'react';
import { useDishes } from '../hooks/useDishes';
import Header from '../components/Header';
import DishCard from '../components/DishCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { PlusIcon } from '@heroicons/react/24/outline';
import { cn } from '../utils';

const Dashboard = () => {
    const { dishes, loading, error, togglePublishStatus, refetch } = useDishes();
    const [updatingDishes, setUpdatingDishes] = useState(new Set());

    const handleTogglePublish = async (dishId) => {
        setUpdatingDishes(prev => new Set([...prev, dishId]));
        try {
            await togglePublishStatus(dishId);
        } finally {
            setUpdatingDishes(prev => {
                const newSet = new Set(prev);
                newSet.delete(dishId);
                return newSet;
            });
        }
    };

    const publishedCount = dishes.filter(dish => dish.isPublished).length;

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                <Header dishCount={0} publishedCount={0} />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <LoadingSpinner
                        size="large"
                        text="Loading dishes..."
                        className="h-64"
                    />
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                <Header dishCount={0} publishedCount={0} />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <ErrorMessage
                        error={error}
                        onRetry={refetch}
                        title="Failed to load dishes"
                        className="max-w-md mx-auto"
                    />
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Header dishCount={dishes.length} publishedCount={publishedCount} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                {/* Page Header */}
                <div className="mb-6 sm:mb-8">                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            Dish Management
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
                            Manage your restaurant's dish catalog and publication status
                        </p>
                    </div>
                </div>
                </div>

                {/* Dishes Grid */}
                {dishes.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 dark:text-gray-500 text-4xl sm:text-6xl mb-4">🍽️</div>
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No dishes found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base px-4">
                            Get started by adding your first dish to the menu.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                        {[...dishes].sort((a, b) => a.dishId - b.dishId).map((dish) => (
                            <div
                                key={dish.dishId}
                                className={cn(
                                    "relative animate-fade-in",
                                    updatingDishes.has(dish.dishId) && "opacity-75"
                                )}
                            >
                                <DishCard
                                    dish={dish}
                                    onTogglePublish={handleTogglePublish}
                                    isUpdating={updatingDishes.has(dish.dishId)}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer Info */}
                <div className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-gray-500">
                    <p>
                        Real-time updates enabled • {dishes.length} total dishes
                    </p>
                </div>

                {/* Developer Info */}
                <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Built by Ved Sharma
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                            <a
                                href="mailto:vedsharma8877@gmail.com"
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                vedsharma8877@gmail.com
                            </a>

                            <span className="hidden sm:block text-gray-300 dark:text-gray-600">•</span>

                            <a
                                href="https://linkedin.com/in/vedsharma8877"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                                </svg>
                                LinkedIn
                            </a>

                            <span className="hidden sm:block text-gray-300 dark:text-gray-600">•</span>

                            <a
                                href="https://github.com/vedsharma8877"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                </svg>
                                GitHub
                            </a>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm mt-4">
                            <a
                                href="https://drive.google.com/file/d/1wgTl7IdpIl4xfxm7kGGKpHaGLCRHdQss/view"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                                </svg>
                                Resume
                            </a>

                            <span className="hidden sm:block text-gray-300 dark:text-gray-600">•</span>

                            <a
                                href="https://vedsharma.netlify.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                                </svg>
                                Portfolio
                            </a>
                        </div>

                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
                            Built with ❤️ using React, Node.js, MongoDB, and Socket.IO
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
