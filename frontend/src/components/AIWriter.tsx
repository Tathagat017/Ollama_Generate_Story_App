import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Slider,
  Box,
} from "@mui/material";
import { aiService } from "../services/api";
import LoadingSpinner from "./LoadingSpinner";

const AIWriter = () => {
  const [topic, setTopic] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await aiService.generateStory(topic, temperature);
      setStory(response.text);
    } catch (err) {
      setError("Failed to generate story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        ✍️ AI Story Writer
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Enter a topic for your story"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          margin="normal"
          required
        />

        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom>Temperature: {temperature}</Typography>
          <Slider
            value={temperature}
            onChange={(_, value) => setTemperature(value as number)}
            min={0.1}
            max={1.0}
            step={0.1}
            marks
            valueLabelDisplay="auto"
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
         
        >
          Generate Story
        </Button>
      </form>

      {loading && <LoadingSpinner />}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {story && (
        <Paper sx={{ mt: 3, p: 2, bgcolor: "grey.100" }}>
          <Typography variant="body1" whiteSpace="pre-wrap">
            {story}
          </Typography>
        </Paper>
      )}
    </Paper>
  );
};

export default AIWriter;
