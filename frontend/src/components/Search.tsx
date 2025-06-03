import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { aiService } from "../services/api";
import LoadingSpinner from "./LoadingSpinner";

interface SearchResult {
  id: string;
  score: number;
  metadata: {
    text: string;
    [key: string]: any;
  };
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await aiService.search(query);
      setResults(response.results);
    } catch (err) {
      setError("Failed to perform search. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        🔍 Document Search
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Enter your search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          margin="normal"
          required
          placeholder="Search through indexed documents"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading || !query}
        >
          Search
        </Button>
      </form>

      {loading && <LoadingSpinner />}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {results.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Search Results
          </Typography>
          <List>
            {results.map((result) => (
              <ListItem
                key={result.id}
                sx={{
                  bgcolor: "grey.100",
                  mb: 1,
                  borderRadius: 1,
                }}
              >
                <ListItemText
                  primary={result.metadata.text}
                  secondary={`Relevance Score: ${(result.score * 100).toFixed(
                    2
                  )}%`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {results.length === 0 && !loading && query && (
        <Typography
          sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}
        >
          No results found
        </Typography>
      )}
    </Paper>
  );
};

export default Search;
