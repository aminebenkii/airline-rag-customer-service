import os
from datetime import datetime
from typing import Dict, Any
from app.backend.utils.utils import load_json, save_json

# ─────────────────────────────────────────────
# PATH CONFIGURATION
PROJECT_ROOT_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
SESSIONS_STORAGE_PATH = os.path.join(PROJECT_ROOT_DIR, "storage", "sessions")

# Ensure the sessions directory exists
os.makedirs(SESSIONS_STORAGE_PATH, exist_ok=True)


def load_or_create_session(session_id: str) -> Dict[str, Any]:
    """
    Retrieves an existing session by ID or creates a new one if it doesn't exist.

    Args:
        session_id (str): Unique identifier for the session.

    Returns:
        dict: Session data including session ID, creation date, and conversation history.
    """
    session_file_path = os.path.join(SESSIONS_STORAGE_PATH, f"{session_id}.json")

    if os.path.exists(session_file_path):
        return load_json(session_file_path)

    # Create a new session if not found
    session_data = {
        "creation_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "session_id": session_id,
        "conversation_history": [],
    }
    return session_data


def save_session(session_data: Dict[str, Any]) -> None:
    """
    Saves session data to a JSON file using the session ID as the filename.

    Args:
        session_data (dict): The session data to persist.

    Raises:
        ValueError: If 'session_id' is missing from session_data.
    """
    session_id = session_data.get("session_id")
    if not session_id:
        raise ValueError("Session data must include a 'session_id' key.")

    session_file_path = os.path.join(SESSIONS_STORAGE_PATH, f"{session_id}.json")
    save_json(session_file_path, session_data)
