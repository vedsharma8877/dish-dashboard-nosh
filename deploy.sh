#!/bin/bash

# NOSH Deployment Script for Render

echo "🚀 Starting NOSH deployment preparation..."

# Backend preparation
echo "📦 Preparing backend..."
cd backend
npm install --production
echo "✅ Backend dependencies installed"

# Frontend preparation
echo "🎨 Preparing frontend..."
cd ../frontend
npm install
npm run build
echo "✅ Frontend built successfully"

echo "🎉 NOSH is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub"
echo "2. Connect your repository to Render"
echo "3. Deploy using the render.yaml configuration"
