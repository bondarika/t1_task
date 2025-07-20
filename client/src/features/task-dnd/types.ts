/**
 * Пропсы для компонента доски с drag-and-drop функциональностью
 * @description Определяет интерфейс для компонента, который позволяет
 * перетаскивать задачи между колонками статусов
 * @param onEdit - Callback для редактирования задачи
 * @param onDelete - Callback для удаления задачи
 */
export interface TaskDndBoardProps {
  /** Callback функция для редактирования задачи по ID */
  onEdit: (id: number) => void;
  /** Callback функция для удаления задачи по ID */
  onDelete: (id: number) => void;
}
