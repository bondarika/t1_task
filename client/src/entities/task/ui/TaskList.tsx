import { Row, Col, Empty, Spin } from 'antd';
import { type TaskListProps } from '../model/types';
import { TaskItem } from './TaskItem';
import { STATUS_COLUMNS } from '../model/constants';
import { Droppable, Draggable } from '@hello-pangea/dnd';

/**
 * Компонент списка задач с поддержкой drag-and-drop
 * @description Отображает задачи в колонках по статусам с возможностью сортировки по приоритету
 * @param props - Пропсы компонента
 * @param props.tasks - Массив задач для отображения
 * @param props.loading - Состояние загрузки
 * @param props.onDelete - Callback для удаления задачи
 * @param props.onEdit - Callback для редактирования задачи
 * @param props.dnd - Флаг включения drag-and-drop функциональности
 * @returns JSX элемент списка задач
 *
 * @example
 * ```tsx
 * <TaskList
 *   tasks={tasks}
 *   loading={isLoading}
 *   onDelete={handleDelete}
 *   onEdit={handleEdit}
 *   dnd={true}
 * />
 * ```
 */
export function TaskList({
  tasks,
  loading,
  onDelete,
  onEdit,
  dnd = false,
}: TaskListProps & { dnd?: boolean }) {
  if (loading)
    return (
      <div style={{ textAlign: 'center', margin: '48px 0' }}>
        <Spin size="large" />
      </div>
    );
  if (!tasks.length) return <Empty description="Нет задач" />;

  return (
    <Row gutter={[24, 32]} style={{ flexWrap: 'wrap' }}>
      {STATUS_COLUMNS.map((col) => (
        <Col xs={24} sm={24} md={8} key={col.key}>
          <div style={{ textAlign: 'center', fontWeight: 600, marginBottom: 16, fontSize: 16 }}>
            {col.label}
          </div>
          {dnd ? (
            <Droppable droppableId={col.key}>
              {(provided, snapshot) => {
                /**
                 * Фильтрует и сортирует задачи для текущей колонки
                 * @description Фильтрует по статусу и сортирует по приоритету (High -> Medium -> Low)
                 */
                const filteredTasks = tasks
                  .filter((task) => task.status === col.key)
                  .sort((a, b) => {
                    const priorityOrder = { High: 0, Medium: 1, Low: 2 };
                    const aPriority = a.priority || 'Low';
                    const bPriority = b.priority || 'Low';
                    return priorityOrder[aPriority] - priorityOrder[bPriority];
                  });
                const isEmpty = filteredTasks.length === 0;
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      minHeight: 180,
                      background: snapshot.isDraggingOver ? '#f0f0f0' : undefined,
                      transition: 'background 0.2s',
                    }}
                  >
                    {filteredTasks.map((task, idx) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={idx}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              opacity: snapshot.isDragging ? 0.7 : 1,
                              marginBottom: 24,
                            }}
                          >
                            <TaskItem task={task} onDelete={onDelete} onEdit={onEdit} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {isEmpty && !snapshot.isDraggingOver && (
                      <div style={{ color: '#bbb', textAlign: 'center', marginBottom: 16 }}>
                        Нет задач
                      </div>
                    )}
                  </div>
                );
              }}
            </Droppable>
          ) : tasks.filter((task) => task.status === col.key).length === 0 ? (
            <div style={{ color: '#bbb', textAlign: 'center', marginBottom: 16 }}>Нет задач</div>
          ) : (
            tasks
              .filter((task) => task.status === col.key)
              .sort((a, b) => {
                const priorityOrder = { High: 0, Medium: 1, Low: 2 };
                const aPriority = a.priority || 'Low';
                const bPriority = b.priority || 'Low';
                return priorityOrder[aPriority] - priorityOrder[bPriority];
              })
              .map((task) => (
                <TaskItem key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
              ))
          )}
        </Col>
      ))}
    </Row>
  );
}
