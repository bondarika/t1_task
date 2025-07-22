# Task Tracker

## Описание

Приложение для управления задачами с поддержкой drag-and-drop, построенное на архитектуре Feature-Sliced Design (FSD).

## Архитектура

### Feature-Sliced Design (FSD)

Проект организован по методологии FSD, которая разделяет код на слои по принципу зависимости:

```
src/
├── app/          # Инициализация приложения
├── pages/        # Страницы приложения
├── widgets/      # Композитные блоки
├── features/     # Функциональные возможности
├── entities/     # Бизнес-сущности
└── shared/       # Переиспользуемый код
```

## Структура проекта

### Frontend (React + TypeScript)

```
client/
├── src/
│   ├── app/              # Инициализация приложения
│   ├── pages/            # Страницы
│   │   ├── TaskListPage/ # Страница списка задач
│   │   └── TaskFormPage/ # Страница формы задачи
│   ├── features/         # Функциональности
│   │   └── task-dnd/     # Drag-and-drop для задач
│   ├── entities/         # Бизнес-сущности
│   │   └── task/         # Сущность задачи
│   └── shared/           # Переиспользуемый код
│       ├── api/          # API утилиты
│       └── lib/          # Утилиты
└── README.md
```

### Backend (Node.js + Express + TypeScript)

```
api/
├── src/
│   ├── api/              # API endpoints
│   │   ├── task/         # API задач
│   │   └── healthCheck/  # Health check
│   ├── api-docs/         # Swagger документация
│   ├── common/           # Общий код
│   │   ├── middleware/   # Middleware
│   │   ├── models/       # Модели
│   │   └── utils/        # Утилиты
│   └── index.ts          # Точка входа
└── README.md
```

## Основные технологии

### Frontend

- **React 18** - UI библиотека
- **TypeScript** - Типизация
- **MobX** - Управление состоянием
- **Ant Design** - UI компоненты
- **@hello-pangea/dnd** - Drag-and-drop
- **Vite** - Сборщик

### Backend

- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Типизация
- **Zod** - Валидация
- **Swagger UI** - API документация
- **Helmet** - Безопасность

## Документация

### Архитектурная документация

- [Task Entity](./client/src/entities/task/README.md) - Документация сущности задачи
- [Task DnD Feature](./client/src/features/task-dnd/README.md) - Документация drag-and-drop
- [Shared Layer](./client/src/shared/README.md) - Документация shared слоя

### API документация (не сработает в Safari)

- Swagger UI: `http://localhost:8080/` 
- JSON спецификация: `http://localhost:8080/swagger.json`

## Запуск проекта локально (из ветки task_3)

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd api
npm install
npm run start
```