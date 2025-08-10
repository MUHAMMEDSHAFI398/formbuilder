import { Routes, Route, Navigate } from 'react-router-dom';
import CreateForm from './pages/CreateForm';
import PreviewForm from './pages/PreviewForm';
import MyForms from './pages/MyForms';
import Layout from './components/Layout';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/myforms" replace />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/preview" element={<PreviewForm />} />
        <Route path="/myforms" element={<MyForms />} />
      </Routes>
    </Layout>
  );
}
