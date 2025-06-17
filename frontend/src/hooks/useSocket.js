import { useState, useEffect } from 'react';
import socketService from '../services/socket';

export const useSocket = () => {
    const [connected, setConnected] = useState(false);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = socketService.connect();
        setSocket(socketInstance);

        const handleConnect = () => {
            setConnected(true);
        };

        const handleDisconnect = () => {
            setConnected(false);
        };

        socketInstance.on('connect', handleConnect);
        socketInstance.on('disconnect', handleDisconnect);

        // Set initial connection state
        setConnected(socketInstance.connected);

        return () => {
            socketInstance.off('connect', handleConnect);
            socketInstance.off('disconnect', handleDisconnect);
        };
    }, []);

    const disconnect = () => {
        socketService.disconnect();
        setConnected(false);
        setSocket(null);
    };

    return {
        socket,
        connected,
        disconnect,
    };
};
