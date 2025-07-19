import { runInAction } from 'mobx';

/**
 * Универсальная обработка ошибок для MobX-сторов
 * @param setLoading - функция для установки состояния загрузки
 * @param error - объект ошибки
 * @param context - строка-контекст (описание действия)
 */
export function handleError(
  setLoading: (loading: boolean) => void,
  error: unknown,
  context: string,
) {
  runInAction(() => {
    setLoading(false);
  });
  // Можно добавить расширенную обработку ошибок (логирование, уведомления и т.д.)
  console.error(`Ошибка ${context}:`, error);
}
