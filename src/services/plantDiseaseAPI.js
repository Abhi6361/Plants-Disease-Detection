// Real API service for plant disease detection using backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const detectPlantDisease = async (imageFile, symptoms) => {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('symptoms', symptoms);

    // Make API call to backend
    const response = await fetch(`${API_BASE_URL}/detect-disease`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'API request failed');
    }

    return data.data;
  } catch (error) {
    throw new Error('Failed to detect plant disease: ' + error.message);
  }
};

// Health check function
export const checkAPIHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

// Get supported file formats
export const getSupportedFormats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/formats`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to get supported formats:', error);
    return {
      supportedFormats: ['JPEG', 'PNG', 'WebP'],
      maxFileSize: '10MB',
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
    };
  }
};

// Real API integration example (uncomment and modify as needed)
/*
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
*/