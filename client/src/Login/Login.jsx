import React, { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; 
import axios from "axios"; 
import "./Login.css";
import { useNavigate } from "react-router-dom"; 
import ClipLoader from "react-spinners/ClipLoader"; 

function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError(""); 
    setLoading(true); 

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token); 
      console.log("Login successful:", token);
      navigate("/dashboard", { replace: true }); 
    } catch (err) {
      setError("Invalid email or password."); 
      console.error("Login error:", err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="login">
      <div>
        <div className="login-circle"></div>
        <div className="login-container">
          <div className="login-form">
            <h1>Login</h1>
            <div className="title-underline"></div>
           
            <form onSubmit={handleLogin}> 
              <div className="inputs-login">
                <div className="email">
                  <IoMdMail className="email-icon"/>
                  <input 
                    type="text" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                </div>
                <div className="password">
                  <FaLock className="email-icon"/>
                  <input
                    type={passwordVisible ? "text" : "password"} 
                    placeholder="Enter your password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                  <span onClick={togglePasswordVisibility} className="eye-icon">
                    {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </div>
                <button type="submit" className="login-submit"> 
                  Login
                </button>
                {loading && (
                  <div className="loader">
                    <ClipLoader size={35} color={"#007bff"} loading={loading} />
                  </div>
                )}
                {error && <p className="error-message">{error}</p>} 
              </div>
            </form>
          </div>
          <div className="login-image"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
