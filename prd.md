Build a simple Nodejs React app:

✍️ AI Writer (story from topic)
🗣️ Rephraser (e.g., rewrite like a CEO, teenager, comedian)
📚 Explainer (e.g., explain concept in simple words)
🔍 Custom Search (query over static docs using local embedding + RAG) ← if they’re ready

Constraints:

No OpenAI or Anthropic APIs
All logic must use a local LLM running on their machine
Requirements:

Prompt input box
Model output display
Temperature setting (optional)
Loading UI
Output logging (local file or frontend)

Model : deepseek r1:1.5b

Frontend : React
backend : node + express ( without typescript)
Db : Pinecone

I will create .env file in both frontend and backend :

/frontend/.env - VITE_API_URL =
/backend/.env

PHASE 1

Please go through the existing backend project structure and start implementing backend

PHASE 2 :
frontend ui to input prompt and display

NOTE: This is a basic MVP . It need not be complicated . DO NOT go beyond scope of the requirement . Application needs to be completed in minutes
