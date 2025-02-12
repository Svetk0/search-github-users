# Search GitHub users

Веб-приложение для поиска и просмотра публичных репозиториев пользователей GitHub.

## Функциональность

- Поиск репозиториев по имени пользователя GitHub
- Отображение информации о репозиториях:
  - Название репозитория
  - Описание
  - Количество звезд
  - Дата последнего обновления
  - Ссылка на репозиторий
- Бесконечная прокрутка для загрузки дополнительных репозиториев
- Дебаунс поисковых запросов для оптимизации производительности
- Адаптивный дизайн

## Технологии

- Next.js 14
- TypeScript
- Redux Toolkit (RTK Query)
- SCSS Modules
- GitHub REST API

## Требования

- Node.js 18.17 или выше
- npm или yarn

## Установка и запуск

1. Клонируйте репозиторий:

```bash
git clone https://github.com/svetk0/search-github-users.git
cd search-github-users
```

2. Установите зависимости:

```bash
npm install
# или
yarn install
```

3. Запустите проект в режиме разработки:

```bash
npm run dev
# или
yarn dev
```

4. Откройте [http://localhost:3018](http://localhost:3018) в браузере.

## Сборка для продакшена

1. Создайте продакшен сборку:

```bash
npm run build
# или
yarn build
```

2. Запустите продакшен сервер:

```bash
npm run start
# или
yarn start
```

## Структура проекта

```
src/
  ├── api/          # API сервисы
  ├── app/          # Next.js страницы и лейауты
  ├── components/   # React компоненты
  ├── lib/          # Redux store и хуки
  ├── store/        # Redux слайсы
  ├── styles/       # Глобальные стили и переменные
  ├── types/        # TypeScript типы
  └── utils/        # Вспомогательные функции
```

## Лицензия

MIT License - подробности в файле [LICENSE](LICENSE)
