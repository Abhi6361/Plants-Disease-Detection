# Plant Disease Detection - Complete Setup Guide

## 🌱 Full-Stack Plant Disease Detection Application

This project includes both frontend (React) and backend (Node.js/Express) components for AI-powered plant disease detection using Clarifai.

## 📁 Project Structure

```
plant-disease-detection-app/
├── src/                          # React frontend
│   ├── components/
│   │   ├── PlantDiseaseDetector.js
│   │   └── PlantDiseaseDetector.css
│   ├── services/
│   │   └── plantDiseaseAPI.js    # Updated to use real backend
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── backend/                       # Node.js backend
│   ├── controllers/
│   │   └── plantDiseaseController.js
│   ├── middleware/
│   │   ├── uploadMiddleware.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   └── plantDiseaseRoutes.js
│   ├── services/
│   │   └── clarifaiService.js    # Clarifai API integration
│   ├── uploads/                  # Temporary file storage
│   ├── server.js
│   ├── package.json
│   └── .env
├── public/
│   └── index.html
├── package.json                  # Frontend dependencies
└── README.md
```

## 🚀 Quick Start

### 1. Frontend Setup (Already Complete)
```bash
# Frontend is already running on http://localhost:3000
npm start
```

### 2. Backend Setup

#### Install Backend Dependencies
```bash
cd backend
npm install
```

#### Configure Environment Variables
```bash
# Edit backend/.env file
CLARIFAI_API_KEY=your_actual_clarifai_api_key_here
PORT=5000
FRONTEND_URL=http://localhost:3000
```

#### Get Clarifai API Key
1. Go to [Clarifai](https://www.clarifai.com/)
2. Sign up for a free account
3. Create a new application
4. Copy your API key from the application settings
5. Paste it in `backend/.env` file

#### Start Backend Server
```bash
cd backend
npm start
# Server will run on http://localhost:5000
```

### 3. Test the Application
1. Open http://localhost:3000 in your browser
2. Upload a plant image
3. Describe symptoms
4. Click "Detect Disease"
5. View AI-powered results!

## 🔧 API Endpoints

### Backend API (http://localhost:5000/api)

- **POST** `/detect-disease` - Analyze plant image and symptoms
- **GET** `/health` - Check API health status
- **GET** `/formats` - Get supported file formats
- **GET** `/history` - Get analysis history (placeholder)

### Example API Usage

```bash
# Health check
curl http://localhost:5000/api/health

# Disease detection
curl -X POST http://localhost:5000/api/detect-disease \
  -F "image=@plant_image.jpg" \
  -F "symptoms=Yellow spots on leaves"
```

## 🛠️ Development

### Frontend Development
```bash
# Start React development server
npm start
```

### Backend Development
```bash
cd backend
# Install nodemon for auto-restart
npm install -g nodemon

# Start with auto-restart
npm run dev
```

## 🔑 Environment Variables

### Frontend (.env in root)
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend (backend/.env)
```bash
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
CLARIFAI_API_KEY=your_clarifai_api_key_here
CLARIFAI_MODEL_ID=general-image-recognition
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
```

## 🎯 Features

### Frontend Features
- ✅ Modern React UI with beautiful design
- ✅ Image upload with drag & drop
- ✅ Symptom description input
- ✅ Real-time API integration
- ✅ Loading states and error handling
- ✅ Responsive design for all devices
- ✅ Results display with confidence scores

### Backend Features
- ✅ Express.js REST API
- ✅ Clarifai AI integration
- ✅ File upload handling with multer
- ✅ Security middleware (helmet, CORS, rate limiting)
- ✅ Error handling and logging
- ✅ Automatic file cleanup
- ✅ Health check endpoints

## 🔍 How It Works

1. **User uploads** a plant image and describes symptoms
2. **Frontend sends** data to backend API
3. **Backend processes** image using Clarifai AI
4. **AI analyzes** image and combines with symptom text
5. **Backend returns** disease diagnosis with treatment recommendations
6. **Frontend displays** results to user

## 🚨 Troubleshooting

### Common Issues

1. **Backend won't start**
   - Check if port 5000 is available
   - Verify all dependencies are installed
   - Check `.env` file configuration

2. **Clarifai API errors**
   - Verify API key is correct
   - Check Clarifai account status
   - Ensure API quotas are not exceeded

3. **CORS errors**
   - Verify `FRONTEND_URL` in backend `.env`
   - Check CORS configuration in server.js

4. **File upload issues**
   - Check file size limits (10MB max)
   - Verify file format (JPEG, PNG, WebP only)
   - Ensure `uploads/` directory exists

### Debug Commands

```bash
# Check backend health
curl http://localhost:5000/api/health

# Test file upload
curl -X POST http://localhost:5000/api/detect-disease \
  -F "image=@test_image.jpg" \
  -F "symptoms=test symptoms"

# Check frontend API connection
curl http://localhost:3000
```

## 📦 Production Deployment

### Frontend Build
```bash
npm run build
# Deploy the 'build' folder to your hosting service
```

### Backend Deployment
1. Set `NODE_ENV=production`
2. Configure production CORS origins
3. Set up reverse proxy (nginx)
4. Use PM2 for process management
5. Configure monitoring and logging

## 🔐 Security Considerations

- API rate limiting (100 requests/15min)
- File type and size validation
- CORS configuration
- Security headers with helmet
- Input sanitization
- Automatic file cleanup

## 📈 Future Enhancements

- [ ] User authentication and history
- [ ] Database integration
- [ ] Multiple AI model support
- [ ] Batch image processing
- [ ] Mobile app development
- [ ] Advanced analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Open an issue on GitHub
4. Contact the development team

---

**Happy Plant Disease Detection! 🌱🔍**