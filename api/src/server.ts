import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';
import { healthCheckRouter } from './api/healthCheck/healthCheckRouter';
import { taskRouter } from './api/task/taskRouter';
import { openAPIRouter } from './api-docs/openAPIRouter';
import errorHandler from './common/middleware/errorHandler';
import rateLimiter from './common/middleware/rateLimiter';
import requestLogger from './common/middleware/requestLogger';
import { env } from './common/utils/envConfig';

const logger = pino({ name: 'server start' });
const app: Express = express();

// Устанавливаем приложение для доверия обратному прокси
app.set('trust proxy', true);

// Промежуточное ПО
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Логирование запросов
app.use(requestLogger);

// Маршруты
app.use('/health-check', healthCheckRouter);
app.use('/tasks', taskRouter);

// Swagger UI интерфейс
app.use(openAPIRouter);

// Обработчики ошибок
app.use(errorHandler());

export { app, logger };
