import { useState, useEffect, useCallback, useRef } from 'react';
import { dishService } from '../services/api';
import socketService from '../services/socket';
import toast from 'react-hot-toast';

export const useDishes = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const pendingUpdatesRef = useRef(new Set()); // Track dishes being updated locally

    // Fetch dishes from API
    const fetchDishes = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await dishService.getDishes();
            setDishes(response.data || []);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Toggle publish status
    const togglePublishStatus = useCallback(async (dishId) => {
        try {
            // Mark this dish as being updated locally
            pendingUpdatesRef.current.add(dishId);

            const response = await dishService.togglePublishStatus(dishId);

            // Update local state immediately for better UX
            setDishes(prevDishes =>
                prevDishes.map(dish =>
                    dish.dishId === dishId
                        ? { ...dish, isPublished: response.data.isPublished }
                        : dish
                )
            );

            toast.success(
                `Dish ${response.data.isPublished ? 'published' : 'unpublished'} successfully!`
            );

            // Remove from pending updates after a short delay to handle race conditions
            setTimeout(() => {
                pendingUpdatesRef.current.delete(dishId);
            }, 1000);

            return response.data;
        } catch (err) {
            // Remove from pending updates if error occurs
            pendingUpdatesRef.current.delete(dishId);
            toast.error(err.message);
            throw err;
        }
    }, []);

    // Handle real-time updates from other clients
    useEffect(() => {
        socketService.connect();

        const unsubscribe = socketService.onDishUpdate((updatedDish) => {
            // Skip notification if this dish is currently being updated locally
            const isLocalUpdate = pendingUpdatesRef.current.has(updatedDish.dishId);

            setDishes(prevDishes =>
                prevDishes.map(dish =>
                    dish.dishId === updatedDish.dishId
                        ? updatedDish
                        : dish
                )
            );

            // Only show notification for remote updates (when another client makes changes)
            if (!isLocalUpdate && updatedDish.dishName) {
                toast.success(
                    `Dish "${updatedDish.dishName}" was ${updatedDish.isPublished ? 'published' : 'unpublished'} remotely!`
                );
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    // Initial data fetch
    useEffect(() => {
        fetchDishes();
    }, [fetchDishes]);

    return {
        dishes,
        loading,
        error,
        fetchDishes,
        togglePublishStatus,
        refetch: fetchDishes,
    };
};
