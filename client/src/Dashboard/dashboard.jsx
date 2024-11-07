// src/Dashboard/dashboard.js
import React, { useState } from 'react';
import Layout from './Layout';
import { Outlet, useLocation } from 'react-router-dom';
import './Layout.css'; 

function Dashboard() {
  const [pageTitle, setPageTitle] = useState('Dashboard'); 
  const location = useLocation(); 
  const getTitle = () => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 1) {
      const currentPath = pathParts[pathParts.length - 1].charAt(0).toUpperCase() + pathParts[pathParts.length - 1].slice(1);
      setPageTitle(`Dashboard -> ${currentPath}`);  
    }
  };

  React.useEffect(() => {
    getTitle();
  }, [location.pathname]);
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentPath = pathParts[pathParts.length - 1];

  return (
    <Layout>
      <div  className='path-container'>
      <h1 className='dashboard-header'>
        Dashboard 
        {pathParts.length > 1 && (
          <>
            <span> - </span>
            <span className="current-path">{currentPath.charAt(0).toUpperCase() + currentPath.slice(1)}</span>
          </>
        )}
      </h1> </div>
      <Outlet context={{ getTitle }} /> 
    </Layout>
  );
}

export default Dashboard;
