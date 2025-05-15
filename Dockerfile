FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["sh", "-c", "gunicorn -w 1 -k uvicorn.workers.UvicornWorker app.backend.main:app --bind 0.0.0.0:$PORT --timeout 60 --log-level info"]
