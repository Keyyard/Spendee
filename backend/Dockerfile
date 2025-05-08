# Use official Python image as base
FROM python:3.11-slim

# Set work directory
WORKDIR /app

# Copy Prisma schema and migrations
COPY ./prisma ./prisma


# Install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Run Prisma generate to create the client
RUN prisma generate


# Copy app code
COPY ./app ./app

# Copy env
COPY .env .env

# Expose port
EXPOSE 8000

# Start FastAPI app with uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
