# NOSH Frontend

A modern React dashboard for managing dish information with real-time updates.

## Features

- 🎨 Modern UI built with React 18 + Vite
- 🔄 Real-time updates using Socket.IO
- 🎯 Toggle dish publication status
- 📱 Responsive design with Tailwind CSS
- 🚀 Fast development with Vite HMR
- 🔔 Toast notifications for user feedback
- ⚡ Optimized performance with React hooks

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **React Hot Toast** - Notifications
- **Heroicons** - Icon library
- **Headless UI** - Accessible UI components

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend server running on port 5000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm run preview
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |
| `VITE_SOCKET_URL` | Socket.IO server URL | `http://localhost:5000` |
| `VITE_NODE_ENV` | Environment | `development` |

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DishCard.jsx    # Individual dish card
│   ├── Header.jsx      # App header with stats
│   ├── LoadingSpinner.jsx
│   └── ErrorMessage.jsx
├── hooks/              # Custom React hooks
│   ├── useDishes.js    # Dish management logic
│   └── useSocket.js    # Socket.IO connection
├── pages/              # Page components
│   └── Dashboard.jsx   # Main dashboard page
├── services/           # API and external services
│   ├── api.js          # HTTP API client
│   └── socket.js       # Socket.IO service
├── utils/              # Utility functions
│   └── index.js        # Common utilities
├── types/              # Type definitions
│   └── index.js        # TypeScript-style types
├── App.jsx             # Main app component
└── main.jsx            # App entry point
```

## Key Components

### DishCard
Displays individual dish information with toggle functionality:
- Dish image with fallback
- Publication status badge
- Toggle switch for publish/unpublish
- Loading states

### Dashboard
Main page component that:
- Fetches and displays all dishes
- Handles real-time updates
- Manages loading and error states
- Provides dish statistics

### Hooks

#### useDishes
Custom hook for dish management:
- Fetches dishes from API
- Handles toggle operations
- Manages real-time updates via Socket.IO
- Provides loading and error states

#### useSocket
Manages Socket.IO connection:
- Connection status tracking
- Event handling utilities
- Automatic reconnection

## Real-time Features

The app automatically updates when:
- Dishes are published/unpublished from other clients
- Backend changes occur directly in the database
- Connection status changes

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Performance Optimizations

- Vite for fast builds and HMR
- React.memo for component optimization
- Efficient state management with custom hooks
- Debounced operations for better UX
- Lazy loading for images

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
