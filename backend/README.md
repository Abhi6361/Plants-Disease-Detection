# Plant Disease Detection Backend API

A Node.js/Express backend API for plant disease detection using GitHub AI service.

## Features

- 🔍 **AI-Powered Disease Detection**: Uses GitHub AI (GPT-5) for image analysis
- 📸 **Image Upload**: Handles image uploads with validation
- 🛡️ **Security**: Rate limiting, CORS, helmet security headers
- 📝 **Symptom Analysis**: Combines image analysis with symptom descriptions
- 🧹 **File Management**: Automatic cleanup of uploaded files
- 📊 **Health Monitoring**: Health check endpoints
- ⚡ **Error Handling**: Comprehensive error handling and logging

## API Endpoints

### POST `/api/detect-disease`
Detect plant disease from uploaded image and symptoms.

**Request:**
- `image`: Image file (JPEG, PNG, WebP)
- `symptoms`: Text description of observed symptoms

**Response:**
```json
{
  "success": true,
  "data": {
    "disease": "Leaf Spot Disease",
    "confidence": 0.87,
    "description": "Leaf spot diseases are caused by various fungi...",
    "treatment": "Remove affected leaves, improve air circulation...",
    "prevention": "Ensure proper spacing between plants...",
    "concepts": [...],
    "symptoms_analyzed": "Yellow spots on leaves",
    "timestamp": "2025-09-13T17:30:00.000Z"
  },
  "message": "Plant disease analysis completed successfully"
}
```

### GET `/api/health`
Check service health and configuration status.

### GET `/api/formats`
Get supported file formats and upload limits.

### GET `/api/history`
Get analysis history (placeholder for future implementation).

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Copy `env.example` to `.env` and configure:

```bash
cp env.example .env
```

Required environment variables:
- `GITHUB_TOKEN`: Your GitHub token for AI inference
- `GITHUB_MODEL`: GitHub AI model (default: openai/gpt-5)
- `PORT`: Server port (default: 5000)
- `FRONTEND_URL`: Frontend URL for CORS

### 3. Get GitHub Token
1. Get a GitHub token with appropriate permissions
2. Add it to your `.env` file as `GITHUB_TOKEN`
3. The service uses GitHub AI inference API with GPT-5 model

### 4. Start the Server
```bash
# Development
npm run dev

# Production
npm start
```

## Project Structure

```
backend/
├── controllers/
│   └── plantDiseaseController.js    # Main controller logic
├── middleware/
│   ├── uploadMiddleware.js         # File upload handling
│   └── errorHandler.js             # Global error handling
├── routes/
│   └── plantDiseaseRoutes.js       # API routes
├── services/
│   └── githubAIService.js          # GitHub AI API integration
├── uploads/                         # Temporary file storage
├── server.js                        # Main server file
├── package.json                     # Dependencies
└── env.example                      # Environment template
```

## Dependencies

- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **multer**: File upload handling
- **helmet**: Security headers
- **express-rate-limit**: Rate limiting
- **@azure-rest/ai-inference**: GitHub AI inference client
- **@azure/core-auth**: Azure authentication for GitHub AI
- **dotenv**: Environment variable management
- **sharp**: Image processing (optional)
- **morgan**: HTTP request logging

## Error Handling

The API includes comprehensive error handling for:
- File upload errors
- API rate limiting
- Invalid file types
- Missing required fields
- GitHub AI API errors
- File system errors

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configurable cross-origin requests
- **Helmet**: Security headers
- **File Validation**: Type and size validation
- **Input Sanitization**: Request body validation

## File Upload

- **Supported Formats**: JPEG, PNG, WebP
- **Maximum Size**: 10MB
- **Storage**: Temporary files in `uploads/` directory
- **Cleanup**: Automatic file cleanup after processing

## Development

### Running in Development Mode
```bash
npm run dev
```
Uses nodemon for automatic restart on file changes.

### Testing the API
Use tools like Postman or curl to test endpoints:

```bash
# Health check
curl http://localhost:5000/api/health

# Disease detection
curl -X POST http://localhost:5000/api/detect-disease \
  -F "image=@plant_image.jpg" \
  -F "symptoms=Yellow spots on leaves"
```

## Production Deployment

1. Set `NODE_ENV=production` in environment
2. Configure proper CORS origins
3. Set up reverse proxy (nginx)
4. Use PM2 or similar for process management
5. Set up monitoring and logging

## Troubleshooting

### Common Issues

1. **GitHub AI Token Error**
   - Ensure GitHub token is correctly set in `.env`
   - Check GitHub token permissions and validity

2. **File Upload Issues**
   - Check file size limits
   - Verify file format is supported
   - Ensure `uploads/` directory exists

3. **CORS Errors**
   - Configure `FRONTEND_URL` in environment
   - Check CORS settings in server.js

## License

MIT License - see LICENSE file for details.