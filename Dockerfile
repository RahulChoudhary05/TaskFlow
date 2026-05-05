FROM python:3.12-slim

WORKDIR /app

COPY backend/requirements.txt .

RUN pip install -r requirements.txt

COPY backend/ .

ENV PYTHONUNBUFFERED=1

CMD ["sh", "-c", "exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
