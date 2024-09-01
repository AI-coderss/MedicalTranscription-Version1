# Use the official Python image
FROM python:3.11-alpine

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --upgrade Flask Werkzeug

# Copy the backend source code
COPY . .

# Expose port
EXPOSE 5000


# Start the backend
CMD ["python", "app.py"]
