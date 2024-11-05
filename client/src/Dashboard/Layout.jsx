// src/Dashboard/Layout.js
import React from "react";
import "./Layout.css";
import { NavLink, useNavigate } from "react-router-dom"; 
import { FaPowerOff } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

const Layout = ({ children }) => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="logo">AL AJR</div>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <h2>Menu</h2>
          <hr />
          <ul>
            <li>
              <NavLink 
                to="activite" 
                className={({ isActive }) => (isActive ? "active-link" : "link")}
              >
                <IoIosArrowForward className='arrow'/>
                Activités
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="beneficiaire" 
                className={({ isActive }) => (isActive ? "active-link" : "link")}
              >
                <IoIosArrowForward className='arrow' />
                Bénéficiaires
              </NavLink>
            </li>
          </ul>
          <button onClick={handleLogout} className="logout-button">
            <FaPowerOff className="off-icon"/> 
            Logout
          </button>
        </aside>

        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
