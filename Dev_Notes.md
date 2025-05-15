# dev_notes.md — Technical Sync for AIRLINE-CHATBOT

## 🗂 Project Architecture

AIRLINE-CHATBOT/
├── app/
│   ├── backend/
│   │   ├── api/                      # FastAPI Routes
│   │   │   └── chat.py               # /chat route logic
│   │   ├── core/                     # Core Logic (LLM, Retrieval, Config)
│   │   │   ├── config.json           # Static config (API keys, settings)
│   │   │   ├── llm_client.py         # OpenAI / Local LLM API calls
│   │   │   └── retrieval.py          # Vector DB queries & retrieval logic
│   │   ├── credentials/              # GCP or API Credentials
│   │   │   └── airline-chatbot-project-xxxx.json
│   │   ├── scripts/                  # Utility scripts for setup or data loading
│   │   │   └── populate_vecstore.py  # Populate vector store
│   │   ├── services/                 # Business Logic Services
│   │   │   ├── firestore_session_service.py # Firestore session handling
│   │   │   └── session_service.py    # Session handling (local or DB)
│   │   ├── utils/                    # Helper Utilities
│   │   │   └── utils.py              # JSON utilities and others
│   │   └── main.py                   # FastAPI app entry point
│   └── frontend/
│       ├── index.html                # Main HTML Chat UI
│       └── assets/                   # Static Assets (CSS, JS, Icons)
│           ├── css/                  # Custom CSS files
│           ├── js/                   # JS Logic (API calls, UI behavior)
│           └── icons/                # Favicon and UI Icons
├── data/                             # Data Storage
│   ├── documents/                    # Knowledge Base Text Files
│   │   └── knowledge.txt
│   └── vectorstore/                  # Vector DB Files (Chroma, Faiss, etc.)
│       ├── chroma.sqlite3
│       └── [Vectorstore ID folders]
├── mlflow_tracking/                  # Experiment Tracking (Optional)
│   └── mlflow_setup.py               
├── storage/                          # Cached Files, Logs, Models
│   └── sessions/                     # JSON Session Files (Local Storage)
├── tests/                            # Unit & Integration Tests
│   └── test_api.py                   
├── .env                              # API Keys & Secrets (Ignored by Git)
├── .gitignore                        # Git Ignore Rules
├── .Dockerignore                     # Docker Ignore Rules
├── Dockerfile                        # Dockerized App Setup
├── docker-compose.yml                # Multi-container Setup (Optional)
├── README.md                         # Project Overview & Setup Instructions
├── Dev_Notes.md                      # Developer Design Notes
├── Makefile                          # Automation Commands
└── requirements.txt                  # Python Dependencies


---

## 🎯 Project Goal

Build a Retrieval-Augmented Generation (RAG) chatbot for airline customer service.  
It uses a persistent vector store (ChromaDB) populated with airline-related info, stores conversation sessions as JSON (for now), and returns helpful answers using OpenAI’s API. All conversation logic is routed through a FastAPI backend.

---

## 🔧 Module Functions Overview

### helpers.py
- `load_json(path)` → dict
- `save_json(path, data)` → writes data to file

### populate_vecstore.py
- Loads `data.txt`, splits by delimiter
- Chunks via `RecursiveCharacterTextSplitter`
- Populates vector store using `OpenAIEmbeddings`


### rag_pipeline.py
- `get_relevant_context(query)` → returns joined `doc.page_content`
- `generate_answer(conversation, model)` → returns LLM answer

### sessions_client.py
- `get_or_create_session(session_id)` → returns existing or new session dict
- `save_session(session_data)` → saves dict to `sessions/{session_id}.json`

### api.py
- `/chat` route  
  - Input: `{session_id, query}`  
  - Loads session  
  - Appends user message  
  - Retrieves context from Chroma  
  - Calls LLM  
  - **TO DO:** Add bot reply to history and save

### main.py
- Creates FastAPI app
- Includes router
- Serves static frontend

---

## ✅ TODOs

- [ ] Implement `build_retrieval_query()` to trim to last N user turns
- [ ] Append bot response to conversation in `api.py` before returning
- [ ] Move from JSON files → Redis session storage (optional)
- [ ] Add `.gitignore` entries for `sessions/`, `venv/`, `vector_store/`
- [ ] Write a few unit tests (`helpers`, `sessions_client`)
