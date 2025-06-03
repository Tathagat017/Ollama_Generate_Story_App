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

const Explainer = () => {
  const [concept, setConcept] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await aiService.explain(concept, temperature);
      setExplanation(response.text);
    } catch (err) {
      setError("Failed to explain concept. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        📚 Concept Explainer
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Enter a concept to explain"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          margin="normal"
          required
          placeholder="Enter any concept or topic you'd like explained in simple terms"
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
          Explain Concept
        </Button>
      </form>

      {loading && <LoadingSpinner />}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {explanation && (
        <Paper sx={{ mt: 3, p: 2, bgcolor: "grey.100" }}>
          <Typography variant="body1" whiteSpace="pre-wrap">
            {explanation}
          </Typography>
        </Paper>
      )}
    </Paper>
  );
};

export default Explainer;
