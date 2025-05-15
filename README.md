# ✈️ Airline Assistant — RAG Chatbot

A Retrieval-Augmented Generation (RAG) chatbot built for airline customer service.  
Built using FastAPI, ChromaDB, OpenAI, and a clean frontend UI.

---

## 🎯 Features
- FastAPI backend with OpenAI integration
- ChromaDB vector store with airline knowledge base
- JSON-based session memory
- Responsive HTML/CSS/JS frontend
- Azure-ready Docker deployment

---

## 🚀 Running Locally

1. Clone the repo

2. Create `.env` file with your OpenAI key:
   ```env
   OPENAI_API_KEY=your-api-key
    ```

3. Build and run:
    ```bash
    docker build -t airline-chatbot .
    docker run -p 8000:8000 airline-chatbot
    ```

4. Go to http://localhost:8000



📁 Project Structure :

AIRLINE-CHATBOT/
├── app/
│   ├── backend/
│   │   ├── __pycache__/
│   │   ├── sessions/                # JSON files per session
│   │   ├── utils/
│   │   │   └── helpers.py           # load_json(), save_json()
│   │   ├── vector_store/            # Chroma DB persistent storage
│   │   ├── api.py                   # /chat FastAPI route
│   │   ├── chromadb_client.py       # load_vectorstore(), query_vectorstore()
│   │   ├── config.py                # (empty or config placeholder)
│   │   ├── main.py                  # FastAPI app, static frontend mount
│   │   ├── populate_vecstore.py     # One-time vector store population
│   │   ├── rag_pipeline.py          # get_relevant_context(), generate_answer()
│   │   └── sessions_client.py       # get_or_create_session(), save_session()
│   └── frontend/
│       └── assets/
│         ├──index.html               # Main HTML chat UI
│         └── css/    
│           └── styles.css               # Frontend styling
│         └── js/         
│           └──  script.js                # Handles user input + API calls     
├── azure/
│   ├── deploy.sh                    # Azure deploy script
│   └── README.md                    # Notes for cloud deployment
├── data/
│   └── data.txt                     # Raw knowledge base content
├── docker/
│   ├── .dockerignore
│   └── Dockerfile                   # Container setup
├── mlflow_tracking/
│   └── mlflow_setup.py             # Experiment tracking setup (future)
├── venv/                            # Local Python environment (ignored)
├── .env                             # Secrets and API keys
├── .gitignore                       # Ignore rules
├── docker_compose.yml               # Multi-container setup (optional)
├── README.md                        # General project info
└── requirements.txt                 # Python dependencies


☁️ Azure Deployment : See azure/README.md


✅ TODO :

- Add Redis for session persistence
- Add auth
- MLflow tracking (see mlflow_tracking/)

