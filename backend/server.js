require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const OpenAI = require("openai")
const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const PineconeDB = require("./pinecone");

// Initialize PineconeDB
PineconeDB.initialize();

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Local LLM call
async function callLocalLLM(prompt, temperature = 0.7) {
  try {
    const response = await axios.post(
      process.env.MODEL_PATH || "http://localhost:11434/api/generate",
      {
        model: "deepseek-r1:1.5b",
        prompt,
        stream: false,
        temperature,
      }
    );
    return response.data.response || "[No response from model]";
  } catch (err) {
    console.error("LLM call failed:", err.message);
    throw new Error("Local LLM failed");
  }
}

// AI generation endpoint
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, type, temperature = 0.7 } = req.body;

    if (!prompt || !type) {
      return res.status(400).json({ error: "Prompt and type are required" });
    }

    let fullPrompt;
    switch (type) {
      case "story":
        fullPrompt = `Write a creative and engaging story about the following topic:\n\n${prompt}\n\nMake it detailed and interesting.`;
        break;
      case "rephrase":
        fullPrompt = `Rephrase the following text in a more elegant or refined way:\n\n"${prompt}"`;
        break;
      case "explain":
        fullPrompt = `Explain the following concept in simple, layman's terms with an example:\n\n${prompt}`;
        break;
      default:
        return res.status(400).json({ error: "Invalid type" });
    }

    const result = await callLocalLLM(fullPrompt, temperature);
    res.json({ result });
  } catch (error) {
    console.error("Generation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/search", async (req, res) => {
  const { query, topK } = req.body;

  if (!query) return res.status(400).json({ error: "Query text is required" });

  // 1. Embed the text query
  const embeddingResponse = await openai.createEmbedding({
    input: query,
    model: "text-embedding-ada-002"
  });

  const [{ embedding }] = embeddingResponse.data.data;

  // 2. Query Pinecone with the vector
  const index = pinecone.Index("your-index-name");

  const result = await index.query({
    vector: embedding,
    topK: topK || 5,
    includeMetadata: true
  });

  res.json({ results: result.matches });
});

const PORT = process.env.PORT || 8080; // Hardcoded to match frontend
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
