# 🔧 Fix Clarifai API Key Issue

## Problem
The error shows: `Invalid API key or Invalid API key/application pair`

## Solution Steps

### 1. Get Correct Clarifai API Key
1. Go to [Clarifai.com](https://www.clarifai.com/)
2. Sign in to your account
3. Go to **Applications** in the left sidebar
4. Click on your application (or create a new one)
5. Go to **API Keys** tab
6. Copy the **PAT (Personal Access Token)** - this is your API key

### 2. Update Backend Environment
Edit `backend/.env` file and replace the API key:

```bash
# Replace this line in backend/.env
CLARIFAI_API_KEY=your_actual_pat_token_here
```

**Important:** 
- Use the PAT (Personal Access Token), not the old API key format
- The PAT should look like: `pat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- Make sure there are no extra spaces or quotes

### 3. Restart Backend Server
```bash
cd backend
# Stop current server (Ctrl+C)
# Then restart:
node server.js
```

### 4. Test the Fix
1. Go to http://localhost:3000
2. Upload a plant image
3. Add symptoms description
4. Click "Detect Disease"
5. Should work without API key errors!

## Alternative: Use Mock Mode (For Testing)
If you want to test without Clarifai, you can temporarily use mock responses by modifying the service.

## Need Help?
- Check Clarifai documentation: https://docs.clarifai.com/
- Verify your account has API access
- Make sure you're using the correct PAT format