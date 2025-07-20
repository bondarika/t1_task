import './styles/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, App as AntdApp } from 'antd';
import TaskFormPage from '@pages/TaskFormPage';
import TaskListPage from '@pages/TaskListPage';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#8c8c8c',
          colorInfo: '#bfbfbf',
          colorSuccess: '#b7eb8f',
          colorWarning: '#ffe58f',
          colorError: '#ffa39e',
          borderRadius: 12,
        },
      }}
    >
      <AntdApp>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TaskListPage />} />
            <Route path="/task/new" element={<TaskFormPage />} />
            <Route path="/task/:id" element={<TaskFormPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
