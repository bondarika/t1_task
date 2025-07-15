import './styles/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import TaskFormPage from '@pages/TaskFormPage';
import TaskListPage from '@pages/TaskListPage';

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskListPage />} />
          <Route path="/task/new" element={<TaskFormPage />} />
          <Route path="/task/:id" element={<TaskFormPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
