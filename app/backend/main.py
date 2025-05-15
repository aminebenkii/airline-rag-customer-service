import os
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from app.backend.api.chat import router

# ─────────────────────────────────────────────
# PATH CONFIGURATION
PROJECT_ROOT_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FRONTEND_DIR = os.path.join(PROJECT_ROOT_DIR, "app", "frontend")
STATIC_DIR = os.path.join(PROJECT_ROOT_DIR, "app", "frontend", "assets")
INDEX_FILE_PATH = os.path.join(PROJECT_ROOT_DIR, "app", "frontend", "index.html")

# ─────────────────────────────────────────────
# FASTAPI APPLICATION INITIALIZATION
app = FastAPI(title="AIRLINE Chatbot API", version="1.0.0")

# Register API routes
app.include_router(router)

# Serve static files
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Serve main frontend page
@app.get("/", response_class=FileResponse)
def serve_homepage():
    """Serves the main chat frontend page."""
    return FileResponse(INDEX_FILE_PATH)
