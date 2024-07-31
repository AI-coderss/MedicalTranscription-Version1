# Stage 1: Build the frontend
FROM node:20.15.1 AS frontend-builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY src/package*.json ./src/

# Install dependencies
RUN cd src && npm install

# Copy the rest of the application code
COPY src/ ./src/

# Build the app for production
RUN cd src && npm run build

# Stage 2: Build the backend and combine
FROM python:3.12.4-slim

# Set the working directory to /app
WORKDIR /app

# Copy the backend code
COPY backend/ ./backend/

# Copy the built frontend code from the previous stage
COPY --from=frontend-builder /app/src/build/ /app/src/build/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Install supervisord
RUN apt-get update && apt-get install -y supervisor

# Copy the supervisor configuration file
COPY backend/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose ports for both Flask apps and the frontend (if needed)
EXPOSE 5000 5001 3000

# Start supervisord
CMD ["/usr/bin/supervisord"]
