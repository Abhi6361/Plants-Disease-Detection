const fs = require("fs");
const path = require("path");

// Use built-in fetch in Node.js 18+, else fallback to node-fetch
let fetchFn;
if (typeof fetch === "function") {
  fetchFn = fetch;
  console.log("✅ Using built-in fetch");
} else {
  console.log("⚠️ Using node-fetch (install with: npm install node-fetch@2)");
  fetchFn = require("node-fetch");
}

class GithubAIService {
  constructor() {
    // GitHub Models endpoint
    this.apiUrl = "https://models.inference.ai.azure.com/chat/completions";
    // GPT-4o and GPT-4o-mini both support vision
    this.model = "gpt-4o-mini";
    this.token = process.env.GITHUB_TOKEN;

    if (!this.token) {
      throw new Error("❌ GitHub token not configured. Set GITHUB_TOKEN in .env");
    }
  }

  // Analyze plant disease using image + text
  async analyzeImage(imagePath, symptoms) {
    try {
      console.log("➡️ analyzeImage called with:", { imagePath, symptoms });

      // 1. Validate file existence
      if (!fs.existsSync(imagePath)) {
        throw new Error(`❌ Image file not found: ${imagePath}`);
      }

      // 2. Convert image to base64
      const imageBuffer = fs.readFileSync(imagePath);
      const mimeType = this.getMimeType(imagePath);
      const base64Image = imageBuffer.toString("base64");

      // 3. Build request body with both text + image
      const body = {
        model: this.model,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this plant. Symptoms reported: ${symptoms}. 
                       Identify possible diseases and suggest remedies.`,
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`,
                },
              },
            ],
          },
        ],
      };

      console.log("📤 Sending request to GitHub Models API...");

      // 4. Send request
      const response = await fetchFn(this.apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      console.log("📥 Response status:", response.status);

      const text = await response.text();
      console.log("Raw response text:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error(`❌ Failed to parse JSON: ${e.message}\nRaw: ${text}`);
      }

      console.log(
        "✅ Parsed GitHub API response:",
        JSON.stringify(data, null, 2)
      );

      // 5. Extract model’s answer
      let answer = "No analysis returned";
      const choice = data.choices?.[0];

      if (choice?.message?.content) {
        // Sometimes content is string, sometimes an array
        if (typeof choice.message.content === "string") {
          answer = choice.message.content;
        } else if (Array.isArray(choice.message.content)) {
          answer = choice.message.content
            .map((c) => c.text || "")
            .join("\n")
            .trim();
        }
      }

      return { answer, raw: data };
    } catch (error) {
      console.error("💥 Error in analyzeImage:", error.message);
      throw error;
    }
  }

  // Guess MIME type by extension
  getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
      case ".jpg":
      case ".jpeg":
        return "image/jpeg";
      case ".png":
        return "image/png";
      case ".webp":
        return "image/webp";
      default:
        throw new Error(`Unsupported image type: ${ext}`);
    }
  }
}

module.exports = new GithubAIService();
