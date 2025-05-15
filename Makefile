run:
	uvicorn app.backend.main:app --reload

populate:
	python app/backend/scripts/populate_vectorstore.py

test:
	pytest

format:
	black .

docker-up:
	docker-compose up --build
