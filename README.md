# NOSH - Dish Management System

A full-stack application for managing restaurant dish information with real-time updates. Built with React (Vite), Node.js/Express, MongoDB, and Socket.IO.

## 🚀 Features

- 📋 **Dish Management**: View all dishes with images, names, and IDs
- 🔄 **Real-time Updates**: Automatic updates across all clients using Socket.IO
- 🎯 **Toggle Publication**: Easily publish/unpublish dishes with a simple toggle
- 📱 **Responsive Design**: Modern UI that works on all devices
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development
- 🔔 **User Feedback**: Toast notifications for all actions
- 🛡️ **Production Ready**: Security, rate limiting, and error handling

## 🏗️ Architecture

```
NOSH/
├── backend/          # Node.js/Express API server
│   ├── src/
│   │   ├── app.js           # Main application
│   │   ├── config/          # Database & environment config
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   └── utils/           # Utilities & database seeding
│   └── package.json
├── frontend/         # React/Vite client application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API & Socket.IO services
│   │   └── utils/           # Helper functions
│   └── package.json
└── dish-assignment.json     # Initial dish data
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.IO** - Real-time communication
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **React Hot Toast** - Notifications
- **Heroicons** - Icon library
- **Headless UI** - Accessible components

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or cloud instance)

### Installation

1. **Clone and setup the project:**
```bash
git clone <repository-url>
cd NOSH
```

2. **Install dependencies:**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Environment Configuration:**

Backend (`backend/.env`):
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/nosh

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

Frontend (`frontend/.env`):
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Socket.IO Configuration
VITE_SOCKET_URL=http://localhost:5000

# Environment
VITE_NODE_ENV=development
```

4. **Start the application:**

```bash
# Terminal 1: Start backend server
cd backend
npm run dev

# Terminal 2: Start frontend development server
cd frontend
npm run dev
```

5. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 📊 API Endpoints

### Dishes
- `GET /api/dishes` - Get all dishes
- `GET /api/dishes/:id` - Get dish by ID
- `PATCH /api/dishes/:id/toggle-publish` - Toggle publish status

### Health Check
- `GET /api/health` - API health status

## 🔄 Real-time Features

The application uses Socket.IO for real-time updates:

### Events
- `dishUpdated` - Emitted when a dish's publish status changes
- `connect/disconnect` - Connection status events

### Implementation
- Frontend automatically connects to Socket.IO server
- Real-time updates across all connected clients
- Connection status indicator in the UI
- Automatic reconnection on connection loss

## 🚀 Deployment

### Backend Deployment

1. **Environment Variables:**
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nosh
FRONTEND_URL=https://your-frontend-domain.com
```

2. **Build and Start:**
```bash
npm start
```

### Frontend Deployment

1. **Build for production:**
```bash
npm run build
```

2. **Deploy the `dist` folder** to your hosting platform (Vercel, Netlify, etc.)

### Docker Deployment (Optional)

Backend Dockerfile:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
```

### Frontend Testing
```bash
cd frontend
npm test              # Run tests (if configured)
```

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev           # Start with nodemon (auto-restart)
npm run lint          # Check code style
npm run lint:fix      # Fix code style issues
```

### Frontend Development
```bash
cd frontend
npm run dev           # Start Vite dev server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Check code style
npm run lint:fix      # Fix code style issues
```

## 📝 Data Model

### Dish Schema
```javascript
{
  dishId: String,        // Unique identifier
  dishName: String,      // Display name
  imageUrl: String,      // Image URL
  isPublished: Boolean,  // Publication status
  createdAt: Date,       // Creation timestamp
  updatedAt: Date        // Last update timestamp
}
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API rate limiting
- **Input Validation**: Request validation
- **Error Handling**: Secure error responses

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on all screen sizes
- **Loading States**: Visual feedback for async operations
- **Error Handling**: User-friendly error messages
- **Real-time Indicators**: Connection status and updates
- **Animations**: Smooth transitions and micro-interactions

## 📈 Performance Optimizations

- **Vite**: Fast builds and HMR
- **Code Splitting**: Optimized bundle sizes
- **Efficient State Management**: Custom hooks
- **Image Optimization**: Lazy loading and fallbacks
- **Debounced Operations**: Smooth user interactions

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check MongoDB is running
   - Verify connection string in `.env`
   - Check network connectivity

2. **Socket.IO Connection Issues**
   - Verify backend server is running
   - Check CORS configuration
   - Confirm port availability

3. **Frontend Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MongoDB** for the database
- **Express.js** for the backend framework
- **React** and **Vite** for the frontend
- **Socket.IO** for real-time communication
- **Tailwind CSS** for the styling
- **Heroicons** for the icons

## 📞 Support

If you have any questions or issues, please:
1. Check the troubleshooting section
2. Search existing issues
3. Create a new issue with detailed information

---

**Made with ❤️ by Ved Sharma**
