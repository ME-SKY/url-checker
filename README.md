# Async URL Checker

Fullstack application for asynchronous URL availability checking.

The project provides a REST API for creating URL checking jobs and a web interface for monitoring their progress.

## Features

### Backend

- Create asynchronous URL checking jobs
- Check URLs using HTTP HEAD requests
- Track job progress and status
- Limit concurrent URL checks
- Cancel running jobs
- In-memory data storage

### Frontend

- Create URL checking jobs
- View jobs list
- Monitor active job progress
- View detailed URL statuses
- Cancel running jobs

## Tech Stack

### Backend

- Node.js
- TypeScript
- NestJS

### Frontend

- React
- TypeScript
- Vite

## Project Structure

```
url-checker/
│
├── backend/   # NestJS REST API
│
├── frontend/  # React application
│
└── README.md
```

## Local Development

### Backend

```bash
cd backend

npm install

npm run start:dev
```

Backend runs on:

```
http://localhost:3000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

## Docker

Coming soon.

## Live Demo

Coming soon.

## License

MIT