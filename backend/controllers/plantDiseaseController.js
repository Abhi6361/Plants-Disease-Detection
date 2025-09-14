const githubAIService = require("../services/githubAIService");
const fs = require("fs");

class PlantDiseaseController {
  // Detect plant disease from image and symptoms
  async detectDisease(req, res, next) {
    try {
      console.log("🌱 detectDisease called");
      console.log("📩 Request body:", req.body);
      console.log("📂 Uploaded file:", req.file);

      const { symptoms } = req.body;
      const imageFile = req.file;

      // Validate input
      if (!imageFile) {
        console.warn("⚠️ No image file provided");
        return res.status(400).json({
          success: false,
          message: "No image file provided",
        });
      }

      if (!symptoms || symptoms.trim().length === 0) {
        console.warn("⚠️ Symptoms description missing");
        return res.status(400).json({
          success: false,
          message: "Symptoms description is required",
        });
      }

      console.log("🔎 Calling GitHub AI Service with:", {
        path: imageFile.path,
        symptoms: symptoms.trim(),
      });

      // Analyze image with GitHub AI
      const analysisResult = await githubAIService.analyzeImage(
        imageFile.path,
        symptoms.trim()
      );

      console.log("✅ Analysis result:", analysisResult);

      // Clean up uploaded file
      PlantDiseaseController.cleanupFile(imageFile.path);

      // Return successful response
      res.status(200).json({
        success: true,
        data: analysisResult,
        message: "Plant disease analysis completed successfully",
      });
    } catch (error) {
      console.error("💥 Error in detectDisease:", error.message);

      // Clean up file in case of error
      if (req.file && req.file.path) {
        PlantDiseaseController.cleanupFile(req.file.path);
      }

      res.status(500).json({
        success: false,
        message: "Failed to detect plant disease",
        error: error.message,
      });
    }
  }

  // Get analysis history (placeholder)
  async getAnalysisHistory(req, res, next) {
    try {
      console.log("📜 getAnalysisHistory called");
      res.status(200).json({
        success: true,
        data: [],
        message: "Analysis history retrieved successfully",
      });
    } catch (error) {
      console.error("💥 Error in getAnalysisHistory:", error.message);
      next(error);
    }
  }

  // Get supported file types
  async getSupportedFormats(req, res, next) {
    try {
      console.log("📑 getSupportedFormats called");
      res.status(200).json({
        success: true,
        data: {
          supportedFormats: ["JPEG", "PNG", "WebP"],
          maxFileSize: "10MB",
          allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
        },
        message: "Supported file formats retrieved successfully",
      });
    } catch (error) {
      console.error("💥 Error in getSupportedFormats:", error.message);
      next(error);
    }
  }

  // Health check
  async healthCheck(req, res, next) {
    try {
      console.log("❤️ healthCheck called");

      const githubAIStatus = process.env.GITHUB_TOKEN
        ? "configured"
        : "not configured";

      res.status(200).json({
        success: true,
        data: {
          service: "Plant Disease Detection API",
          status: "healthy",
          githubAI: githubAIStatus,
          timestamp: new Date().toISOString(),
        },
        message: "Service is healthy",
      });
    } catch (error) {
      console.error("💥 Error in healthCheck:", error.message);
      next(error);
    }
  }

  // Clean up uploaded files
  static cleanupFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🧹 Cleaned up file: ${filePath}`);
      }
    } catch (error) {
      console.error(`💥 Failed to cleanup file ${filePath}:`, error.message);
    }
  }

  // Validate image file
  validateImageFile(file) {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!file) {
      throw new Error("No file provided");
    }

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new Error(
        "Invalid file type. Only JPEG, PNG, and WebP images are allowed."
      );
    }

    if (file.size > maxSize) {
      throw new Error("File too large. Maximum size is 10MB.");
    }

    return true;
  }
}

module.exports = new PlantDiseaseController();
