import { Navigate, Route, Routes } from 'react-router-dom'; 
import './App.css';
import Login from './Login/Login';
import Dashboard from './Dashboard/dashboard';
import Beneficiaires from './Dashboard/Beneficiaries/Beneficiaires';
import Activites from './Dashboard/Activities/Activites';
import ProtectedRoute from './Protected';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/login" element={
          <Login />} />
        <Route path="/dashboard" element={<Dashboard/>}>
        <Route index element={<Navigate to="activite" />} />
          <Route path="beneficiaire" element={<ProtectedRoute><Beneficiaires/></ProtectedRoute>} />
          <Route path="activite" element={<ProtectedRoute><Activites/></ProtectedRoute>} />
        </Route>
      </Routes> 
    </div>
  );
}

export default App;
