import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Slider,
  Box,
  MenuItem,
} from "@mui/material";
import { aiService } from "../services/api";
import LoadingSpinner from "./LoadingSpinner";

const STYLE_OPTIONS = [
  "CEO",
  "Teenager",
  "Comedian",
  "Poet",
  "Technical Expert",
  "Marketing Professional",
];

const Rephraser = () => {
  const [text, setText] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [rephrasedText, setRephrasedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await aiService.rephrase(text, temperature);
      setRephrasedText(response.text);
    } catch (err) {
      setError("Failed to rephrase text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        🗣️ Text Rephraser
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Enter text to rephrase"
          value={text}
          onChange={(e) => setText(e.target.value)}
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
          Rephrase Text
        </Button>
      </form>

      {loading && <LoadingSpinner />}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {rephrasedText && (
        <Paper sx={{ mt: 3, p: 2, bgcolor: "grey.100" }}>
          <Typography variant="body1" whiteSpace="pre-wrap">
            {rephrasedText}
          </Typography>
        </Paper>
      )}
    </Paper>
  );
};

export default Rephraser;
