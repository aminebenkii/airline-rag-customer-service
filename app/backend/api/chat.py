import os
from datetime import datetime
from fastapi import APIRouter, Body
from pydantic import BaseModel

from app.backend.services.firestore_session_service import load_or_create_session, save_session
from app.backend.core.llm_client import prepare_llm_payload, generate_llm_response
from app.backend.core.retrieval import build_contextual_query, retrieve_context_chunks
from app.backend.utils.utils import get_config_value

# ─────────────────────────────────────────────
# ROUTER INITIALIZATION
router = APIRouter()

# ─────────────────────────────────────────────
# DATA MODELS

class ChatRequest(BaseModel):
    session_id: str
    query: str

class ChatResponse(BaseModel):
    session_id: str
    answer: str

# ─────────────────────────────────────────────
# ROUTES

@router.post("/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest = Body(...)):
    """
    Chat endpoint to handle user queries, perform retrieval, 
    and generate a response using the LLM agent.
    """
    session_id = request.session_id
    user_query = request.query

    # Retrieve or create user session
    session = load_or_create_session(session_id)

    # Append user query to conversation history
    session["conversation_history"].append({"role": "user", "content": user_query})

    # Build retrieval query using recent conversation context
    retrieval_query = build_contextual_query(session["conversation_history"])

    # Retrieve relevant context chunks based on the retrieval query
    context = retrieve_context_chunks(retrieval_query)

    # Prepare messages for LLM completion
    messages = prepare_llm_payload(context, session["conversation_history"])

    # Generate LLM response
    llm_answer = generate_llm_response(messages)

    # Append assistant response to conversation history
    session["conversation_history"].append({"role": "assistant", "content": llm_answer})

    # Persist the updated session
    save_session(session)

    return ChatResponse(session_id=session_id, answer=llm_answer)
