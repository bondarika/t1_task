import { useParams } from 'react-router-dom';

function TaskFormPage() {
  const { id } = useParams();
  return <div>Task Form Page {id ? `(Edit: ${id})` : '(New)'}</div>;
}

export default TaskFormPage;
