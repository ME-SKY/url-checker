# Async URL Checker

🚀 Демо доступно по адресу:
https://subdomain-freedom.duckdns.org/url-checker

Fullstack-приложение для асинхронной проверки доступности URL.

## Стек 

### Backend
- Node.js
- TypeScript
- NestJS

### Frontend
- React
- TypeScript
- Vite
- Zustand
- Tailwind

## Запуск через Docker

Перед запуском необходимо создать файл окружения и возможно придется пробросить порты:

`frontend/.env.production`

```env
VITE_BASE_PATH=/url-checker/
VITE_API_URL=/api
```

Запуск контейнеров:

```bash
docker compose up --build -d
```

После запуска:

Frontend:
```
http://localhost:8282
```

Backend API:
```
http://localhost:3001/api
```

## Локально

### Backend

```bash
cd backend

npm install

npm run start:dev
```

Backend будет доступен:

```
http://localhost:3000
```

### Frontend

Создать файл:

`frontend/.env.development`

```env
VITE_BASE_PATH=/
VITE_API_URL=http://localhost:3000/api
```

Запуск:

```bash
cd frontend

npm install

npm run dev
```

Frontend будет доступен:

```
http://localhost:5173
```

---

# English Version

🚀 Live demo:
https://subdomain-freedom.duckdns.org/url-checker

Fullstack application for asynchronous URL availability checking.

## Tech Stack

### Backend
- Node.js
- TypeScript
- NestJS

### Frontend
- React
- TypeScript
- Vite
- Zustand
- Tailwind

## Docker Deployment

Before launching, you need to create an environment file and you may have to forward ports:

`frontend/.env.production`

```env
VITE_BASE_PATH=/url-checker/
VITE_API_URL=/api
```

Start containers:

```bash
docker compose up --build -d
```

After startup:

Frontend:
```
http://localhost:8282
```

Backend API:
```
http://localhost:3001/api
```

## Local Development

### Backend

```bash
cd backend

npm install

npm run start:dev
```

Backend:

```
http://localhost:3000
```

### Frontend

Create:

`frontend/.env`

```env
VITE_BASE_PATH=/
VITE_API_URL=http://localhost:3000/api
```

Run:

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```
http://localhost:5173
```