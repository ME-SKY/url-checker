FROM node:22-alpine AS build

WORKDIR /app

ARG VITE_BASE_PATH

ENV VITE_BASE_PATH=$VITE_BASE_PATH

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:22-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "80"]