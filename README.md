# Local AI Application

A full-stack application that integrates with a local AI model (Ollama) to provide AI-powered features.

![image](https://github.com/user-attachments/assets/cc847461-e7bf-4f53-bbf3-08e94b168fa2)


## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Ollama with deepseek-r1:1.5b model installed

## NOTE :

Add .env file in both frontend and backend directory

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=8080
   MODEL_PATH="http://localhost:11434/api/generate"
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will be available at `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   

## Running the Ollama Model

Before starting the application, ensure you have Ollama installed and the deepseek-r1:1.5b model running:

1. Install Ollama from [ollama.ai](https://ollama.ai/)
2. Pull the deepseek-r1:1.5b model:
   ```bash
   ollama pull deepseek-r1:1.5b
   ```
3. Start the Ollama server:
   ```bash
   ollama serve
   ```

## Environment Variables

### Backend
- `PORT=8080` - The port on which the backend server will run
- `MODEL_PATH="http://localhost:11434/api/generate"` - The endpoint for the Ollama API

## Project Structure

```
Local_Ai_Application/
├── backend/             # Backend server code
│   ├── node_modules/    # Dependencies
│   ├── .env             # Environment variables
│   ├── package.json     # Backend dependencies and scripts
│   └── server.js        # Main server file
├── frontend/            # Frontend React application
│   ├── public/          # Static files
│   ├── src/             # Source code
│   ├── package.json     # Frontend dependencies and scripts
│   └── ...
└── README.md           # This file
```

## Troubleshooting

- If you encounter connection issues, ensure the Ollama server is running and accessible at `http://localhost:11434`
- Make sure the backend server is running before starting the frontend
- Check the console logs in both the frontend and backend for any error messages

## License

This project is licensed under the MIT License.
