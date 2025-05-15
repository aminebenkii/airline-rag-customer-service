import os
from datetime import datetime
from dotenv import load_dotenv
from openai import OpenAI
from chromadb import PersistentClient
from chromadb.utils.embedding_functions import OpenAIEmbeddingFunction
from app.backend.utils.utils import get_config_value

# ─────────────────────────────────────────────
# PATH CONFIGURATION
PROJECT_ROOT_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
VECTOR_STORE_PATH = os.path.join(PROJECT_ROOT_DIR, "data", "vectorstore")
DOTENV_PATH = os.path.join(PROJECT_ROOT_DIR, ".env")

# ─────────────────────────────────────────────
# CLIENT INITIALIZATION
load_dotenv(DOTENV_PATH)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai_client = OpenAI(api_key=OPENAI_API_KEY)

chroma_client = PersistentClient(path=VECTOR_STORE_PATH)
embedding_fn = OpenAIEmbeddingFunction(api_key=OPENAI_API_KEY)
collection = chroma_client.get_or_create_collection(name="knowledge", embedding_function=embedding_fn)

# ─────────────────────────────────────────────
# FUNCTION DEFINITIONS

def prepare_llm_payload(context: str, conversation_history: list[dict]) -> list[dict]:
    """ Constructs the message payload for the LLM API."""

    system_prompt = get_config_value("DEFAULT_SYSTEM_PROMPT") or ""
    messages = [{"role": "system", "content": f"{system_prompt}\n\n{context}"}] + conversation_history
    return messages


def generate_llm_response(messages: list[dict]) -> str:
    """ Calls the LLM API and returns the generated response."""

    llm_model = get_config_value("LLM_MODEL") or "gpt-4o-mini"

    try:
        response = openai_client.chat.completions.create(
            model=llm_model,
            messages=messages,
            temperature=0.2,
            max_tokens=500
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        # Consider logging this instead of returning raw error to the user
        return f"⚠️ Error occurred while generating response: {str(e)}"
