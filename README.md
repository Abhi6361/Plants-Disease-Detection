# Plant Disease Detection App

A modern React frontend application for detecting plant diseases using image upload and symptom description.

## Features

- 📸 **Image Upload**: Drag and drop or click to upload plant images
- 📝 **Symptom Description**: Text input for describing observed symptoms
- 🔍 **AI-Powered Detection**: Analyzes images and symptoms to detect diseases
- 📊 **Confidence Scoring**: Shows detection confidence percentage
- 💡 **Treatment Recommendations**: Provides treatment and prevention advice
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- ⚡ **Modern UI**: Beautiful gradient design with smooth animations

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd plant-disease-detection-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── PlantDiseaseDetector.js    # Main detection component
│   └── PlantDiseaseDetector.css   # Component styles
├── services/
│   └── plantDiseaseAPI.js         # API service (currently mocked)
├── App.js                         # Main app component
├── App.css                        # App styles
├── index.js                       # React entry point
└── index.css                      # Global styles
```

## API Integration

The app currently uses a mock API service (`src/services/plantDiseaseAPI.js`) that simulates disease detection. To integrate with a real API:

1. Replace the mock implementation in `plantDiseaseAPI.js`
2. Update the API endpoint URL
3. Modify the request/response format as needed

### Example API Integration

```javascript
export const detectPlantDisease = async (imageFile, symptoms) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('symptoms', symptoms);

  const response = await fetch('/api/detect-disease', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Technologies Used

- **React 18** - Frontend framework
- **Lucide React** - Icon library
- **CSS3** - Styling with modern features
- **Axios** - HTTP client (ready for API integration)

## Features in Detail

### Image Upload
- Supports JPG, PNG, WebP formats
- Drag and drop functionality
- Image preview with remove option
- File validation

### Symptom Input
- Multi-line text area for detailed descriptions
- Placeholder text with examples
- Real-time validation

### Disease Detection Results
- Disease name and confidence percentage
- Visual confidence bar
- Detailed description of the disease
- Treatment recommendations
- Prevention tips
- Reset functionality for new analysis

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface
- Optimized for all screen sizes

## Customization

### Styling
- Modify `src/index.css` for global styles
- Update `src/components/PlantDiseaseDetector.css` for component-specific styles
- Change color scheme by updating CSS custom properties

### Mock Data
- Edit `src/services/plantDiseaseAPI.js` to modify mock disease data
- Add more disease types and responses
- Adjust confidence scoring logic

## Deployment

1. Build the production version:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting service:
   - Netlify
   - Vercel
   - AWS S3
   - GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue on GitHub or contact the development team.