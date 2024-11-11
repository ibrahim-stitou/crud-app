import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import Dashboard from './Dashboard/dashboard';
import Beneficiaires from './Dashboard/Beneficiaries/Beneficiaires';
import Activites from './Dashboard/Activities/Activites';
import BeneficiaireDetails from './Dashboard/Beneficiaries/BeneficiaireDetails'; 
import ActiviteDetails from './Dashboard/Activities/ActiviteDetails'; 
import ProtectedRoute from './Protected';
import NotFounded from './NotFounded/NotFounded';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<NotFounded />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<ProtectedRoute><Navigate to="activite" /></ProtectedRoute>} />
          <Route path="beneficiaire" element={<ProtectedRoute><Beneficiaires /></ProtectedRoute>} />
          <Route path="activite" element={<ProtectedRoute><Activites /></ProtectedRoute>} />
          <Route path="beneficiaire/:id" element={<ProtectedRoute><BeneficiaireDetails /></ProtectedRoute>} />
          <Route path="activite/:id" element={<ProtectedRoute><ActiviteDetails /></ProtectedRoute>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
