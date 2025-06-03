import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import AIWriter from "./components/AIWriter";
import Rephraser from "./components/Rephraser";
import Explainer from "./components/Explainer";
import Search from "./components/Search";

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Local AI Application
            </Typography>
            <Button color="inherit" component={Link} to="/">
              AI Writer
            </Button>
            <Button color="inherit" component={Link} to="/rephraser">
              Rephraser
            </Button>
            <Button color="inherit" component={Link} to="/explainer">
              Explainer
            </Button>
            <Button color="inherit" component={Link} to="/search">
              Search
            </Button>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<AIWriter />} />
            <Route path="/rephraser" element={<Rephraser />} />
            <Route path="/explainer" element={<Explainer />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
