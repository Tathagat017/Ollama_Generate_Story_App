import axios from "axios";

// Default to local development server if VITE_API_URL is not set
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const aiService = {
  generateStory: async (prompt: string, temperature: number = 0.7) => {
    const response = await api.post("/api/generate", { 
      prompt,
      type: "story",
      temperature 
    });
    return { text: response.data.result };
  },

  rephrase: async (prompt: string, temperature: number = 0.7) => {
    const response = await api.post("/api/generate", {
      prompt,
      type: "rephrase",
      temperature,
    });
    return { text: response.data.result };
  },

  explain: async (prompt: string, temperature: number = 0.7) => {
    const response = await api.post("/api/generate", {
      prompt,
      type: "explain",
      temperature,
    });
    return { text: response.data.result };
  },

  search: async (query: string, topK: number = 5) => {
    const response = await api.post("/api/search", { 
      query, 
      topK 
    });
    return { results: response.data.results };
  },
};
