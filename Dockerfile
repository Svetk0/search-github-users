# Этап установки зависимостей
FROM node:18-alpine AS dependencies
WORKDIR /search-github-users
COPY package*.json ./
RUN npm install

# Этап сборки
FROM node:18-alpine AS builder
WORKDIR /search-github-users
COPY . .
COPY --from=dependencies /search-github-users/node_modules ./node_modules
RUN npm run build

# Финальный этап
FROM node:18-alpine AS runner
WORKDIR /search-github-users
ENV NODE_ENV production

# Копируем необходимые файлы из этапа сборки
COPY --from=builder /search-github-users/public ./public
COPY --from=builder /search-github-users/.next ./.next
COPY --from=builder /search-github-users/node_modules ./node_modules
COPY --from=builder /search-github-users/package.json ./package.json

# Открываем порт
EXPOSE 3018

# Запускаем приложение
CMD ["npm", "start"]