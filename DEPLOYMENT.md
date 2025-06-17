# 🚀 NOSH Deployment Guide

## Free Deployment Options

### Option 1: Render (Recommended - Completely Free)

**What you get:**
- ✅ Free backend hosting (Node.js)
- ✅ Free frontend hosting (Static)
- ✅ Free MongoDB database (512MB)
- ✅ Custom domain support
- ✅ Automatic SSL certificates
- ✅ Auto-deploy from Git

**Steps:**

1. **Prepare your repository:**
   ```bash
   # Run this from your NOSH directory
   ./deploy.sh
   ```

2. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial NOSH deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/nosh.git
   git push -u origin main
   ```

3. **Deploy on Render:**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub
   - Click "New" → "Blueprint"
   - Connect your NOSH repository
   - Render will automatically use the `render.yaml` file
   - Wait 5-10 minutes for deployment

4. **Update Frontend URL:**
   - After backend deploys, note the backend URL
   - Update frontend environment variables in Render dashboard
   - Redeploy frontend

### Option 2: Vercel + Railway

**Frontend (Vercel):**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set build settings:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

**Backend (Railway):**
1. Go to [railway.app](https://railway.app)
2. Deploy from GitHub
3. Add MongoDB database
4. Set environment variables

### Option 3: Netlify + Heroku

**Frontend (Netlify):**
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `frontend/dist` folder
3. Or connect GitHub repository

**Backend (Heroku):**
1. Go to [heroku.com](https://heroku.com)
2. Create new app
3. Connect GitHub repository
4. Add MongoDB Atlas (free tier)

## Environment Variables Needed

### Backend (.env):
```
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=your_frontend_url
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env.production):
```
VITE_API_URL=your_backend_url/api
VITE_SOCKET_URL=your_backend_url
```

## Post-Deployment Checklist

- [ ] Backend health check works: `YOUR_BACKEND_URL/api/health`
- [ ] Frontend loads correctly
- [ ] Database connection successful
- [ ] Socket.IO real-time updates working
- [ ] CORS configured properly
- [ ] SSL certificates active

## Troubleshooting

**Common Issues:**

1. **CORS errors:** Update `FRONTEND_URL` in backend environment
2. **Socket.IO not working:** Check `VITE_SOCKET_URL` in frontend
3. **Database connection:** Verify `MONGODB_URI` format
4. **Build fails:** Check Node.js version compatibility

## Cost Breakdown (Free Tiers)

| Service | Frontend | Backend | Database | Total |
|---------|----------|---------|----------|-------|
| Render | Free | Free | Free (512MB) | $0/month |
| Vercel + Railway | Free | Free | Free (5GB) | $0/month |
| Netlify + Heroku | Free | Free* | Free (512MB) | $0/month |

*Heroku free tier requires sleep mode after 30 minutes of inactivity

## 🎉 Your NOSH app will be live at:
- Frontend: `https://your-app-name.onrender.com`
- Backend: `https://your-api-name.onrender.com`
- API: `https://your-api-name.onrender.com/api`
