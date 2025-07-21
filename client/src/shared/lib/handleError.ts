/**
 * Универсальная обработка ошибок
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
