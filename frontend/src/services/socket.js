import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
    constructor() {
        this.socket = null;
        this.listeners = new Map();
        this.isConnecting = false;
    }

    connect() {
        // If already connected or connecting, return existing socket
        if (this.socket?.connected || this.isConnecting) {
            return this.socket;
        }

        this.isConnecting = true;

        this.socket = io(SOCKET_URL, {
            transports: ['websocket', 'polling'],
            timeout: 20000,
            forceNew: true,
            autoConnect: true,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
            withCredentials: true,
            upgrade: true,
            rememberUpgrade: true
        });

        this.socket.on('connect', () => {
            console.log('✅ Connected to server via Socket.IO');
            this.isConnecting = false;
        });

        this.socket.on('disconnect', (reason) => {
            console.log('❌ Disconnected from server:', reason);
            this.isConnecting = false;
        });

        this.socket.on('connect_error', (error) => {
            console.error('🔥 Connection error:', error);
            this.isConnecting = false;
        });

        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.listeners.clear();
        }
    }

    // Listen for dish updates
    onDishUpdate(callback) {
        if (!this.socket) {
            this.connect();
        }

        const eventName = 'dishUpdated';
        this.socket.on(eventName, callback);

        // Store the listener for cleanup
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, []);
        }
        this.listeners.get(eventName).push(callback);

        return () => {
            this.socket.off(eventName, callback);
            const callbacks = this.listeners.get(eventName);
            if (callbacks) {
                const index = callbacks.indexOf(callback);
                if (index > -1) {
                    callbacks.splice(index, 1);
                }
            }
        };
    }

    // Listen for any custom event
    on(eventName, callback) {
        if (!this.socket) {
            this.connect();
        }

        this.socket.on(eventName, callback);

        // Store the listener for cleanup
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, []);
        }
        this.listeners.get(eventName).push(callback);

        return () => {
            this.socket.off(eventName, callback);
            const callbacks = this.listeners.get(eventName);
            if (callbacks) {
                const index = callbacks.indexOf(callback);
                if (index > -1) {
                    callbacks.splice(index, 1);
                }
            }
        };
    }

    // Emit an event
    emit(eventName, data) {
        if (this.socket?.connected) {
            this.socket.emit(eventName, data);
        } else {
            console.warn('Socket not connected. Cannot emit event:', eventName);
        }
    }

    // Get connection status
    isConnected() {
        return this.socket?.connected || false;
    }
}

// Create a singleton instance
const socketService = new SocketService();

export default socketService;
