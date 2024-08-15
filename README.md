# Medical Transcription Application

This repository contains a Medical Transcription application consisting of a React frontend and a Python Flask backend. The application provides transcription services and second opinions for doctors using OpenAI APIs.

## Table of Contents

1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
   - [Frontend Setup](#frontend-setup)
   - [Backend Setup](#backend-setup)
4. [Dockerization](#dockerization)
5. [Deployment](#deployment)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)

## Overview

The application consists of two parts:

- **Frontend**: Built with React.js. It makes two POST requests:
  - **Transcription Endpoint** (`/transcribe`): Fetches transcripts from audio input.
  - **Generate Endpoint** (`/generate`): Provides case analysis using the GPT-4 API.

- **Backend**: Developed using Flask. It has two primary endpoints:
  - **`/transcribe`**: Uses OpenAI's Whisper API to transcribe audio to text.
  - **`/generate`**: Uses OpenAI's GPT-4o API to generate second opinions for doctors.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Python Flask
- **APIs**: OpenAI Whisper API, OpenAI GPT-4 API
- **Containerization**: Docker

## Installation

### Frontend Setup

1. Install the dependencies using npm:
   ```bash
   npm install --force   
  
## Backend Setup
1. Navigate to the backend directory:
bash
cd backend
2. Install the required libraries:
   ```bash
    pip install -r requirements.txt
3. Create a .env file in the backend directory and add your OpenAI API key:
   ```plaintext
   OPENAI_API_KEY="your_api_key"

## Dockerization
To dockerize the application, make sure you have a Dockerfile for both the frontend and backend. You will also need a docker-compose.yml file to manage the containers.
## Deployment
You can deploy the containers on a cloud host such as[Render](https://render.com/):
1. Push your Docker images to a container registry (e.g., Docker Hub).
2. Follow Live Render's documentation to deploy your containers from the registry.
## Usage
1. Start the application using Docker:
 ```bash
    docker-compose up
```
2. Open your browser and go to http://localhost:3000 to access the frontend.
Use the application to transcribe audio and generate second opinions.
## Contributing
Feel free to open issues or submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details. For more information, check the [OpenAI API documentation](https://platform.openai.com/docs).


