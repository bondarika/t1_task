/**
 * Централизованная обработка ошибок в приложении
 * @description Универсальная функция для обработки ошибок с возможностью
 * управления состоянием загрузки и отображения уведомлений
 * @param setLoading - Функция для управления состоянием загрузки
 * @param error - Объект ошибки для обработки
 * @param operationName - Название операции для уведомления пользователя
 * @param showNotification - Флаг для отображения уведомления (по умолчанию true)
 *
 * @example
 * ```ts
 * try {
 *   await someApiCall();
 * } catch (error) {
 *   handleError(
 *     (loading) => setLoading(loading),
 *     error,
 *     'загрузки данных'
 *   );
 * }
 * ```
 */
export const handleError = (
  setLoading: (loading: boolean) => void,
  error: unknown,
  operationName: string,
  showNotification = true,
) => {
  setLoading(false);

  // Логирование ошибки для разработчиков
  console.error(`Error during ${operationName}:`, error);

  // Отображение уведомления пользователю
  if (showNotification) {
    const message = error instanceof Error ? error.message : 'Произошла неизвестная ошибка';
    // Здесь можно интегрировать с системой уведомлений
    alert(`Ошибка при ${operationName}: ${message}`);
  }
};
