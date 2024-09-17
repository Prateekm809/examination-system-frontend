import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const PasswordReset = () => {
  const [step, setStep] = useState('sendCode'); // Track the current step (sendCode or resetPassword)
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // State to handle errors
  const [countdown, setCountdown] = useState(0); // State for countdown
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle sending reset code
  const handleSendCode = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state before attempting request
    setMessage('');
    
    try {
      const response = await axios.post('https://examination-system-backend-production.up.railway.app/api/send-reset-code', { email });
      setMessage('Reset code sent to your email.');
      setStep('resetPassword');   // Move to the next step
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('Email not found. Please check your email and try again.');
      } else {
        setError('Failed to send reset code. Please try again later.');
      }
    }
  };

  // Handle resetting the password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state before attempting request
    setMessage('');
    
    try {
      const response = await axios.post('https://examination-system-backend-production.up.railway.app/api/reset-password', {
        email,
        code,
        newPassword,
      });
      setMessage('Password reset successful. You will be redirected to login.');
      setCountdown(3); // Start countdown for redirection
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Invalid or expired OTP. Please try again.');
      } else if (error.response && error.response.status === 404) {
        setError('User not found for the given email. Please check the details.');
      } else {
        setError('Failed to reset password. Please try again later.');
      }
    }
  };

  // Countdown timer effect for redirection after password reset
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);

      // Redirect to login page after countdown finishes
      if (countdown === 1) {
        navigate('/login'); // Adjust the path as needed
      }

      return () => clearInterval(timer);
    }
  }, [countdown, navigate]);

  return (
    <section className="background-radial-gradient overflow-hidden" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <style>
        {`
          .background-radial-gradient {
            background-color: hsl(218, 41%, 15%);
            background-image: radial-gradient(650px circle at 0% 0%,
                hsl(218, 41%, 35%) 15%,
                hsl(218, 41%, 30%) 35%,
                hsl(218, 41%, 20%) 75%,
                hsl(218, 41%, 19%) 80%,
                transparent 100%),
              radial-gradient(1250px circle at 100% 100%,
                hsl(218, 41%, 45%) 15%,
                hsl(218, 41%, 30%) 35%,
                hsl(218, 41%, 20%) 75%,
                hsl(218, 41%, 19%) 80%,
                transparent 100%);
          }

          #radius-shape-1 {
            height: 220px;
            width: 220px;
            top: -60px;
            left: -130px;
            background: radial-gradient(#44006b, #ad1fff);
            overflow: hidden;
          }

          #radius-shape-2 {
            border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
            bottom: -60px;
            right: -110px;
            width: 300px;
            height: 300px;
            background: radial-gradient(#44006b, #ad1fff);
            overflow: hidden;
          }

          .bg-glass {
            background-color: hsla(0, 0%, 100%, 0.9) !important;
            backdrop-filter: saturate(200%) blur(25px);
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .btn-submit {
            background-color: rgb(68, 177, 49);
            color: white;
            border: none;
          }

          .btn-submit:hover {
            background-color: rgb(50, 150, 30);
          }
        `}
      </style>
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
              Password Reset
            </h1>
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                {step === 'sendCode' ? (
                  <div>
                    <h2>Request Password Reset</h2>
                    <form onSubmit={handleSendCode}>
                      <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                          type="email" 
                          id="email"
                          className="form-control"
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          required 
                        />
                      </div>
                      <button type="submit" className="btn btn-submit">
                        Send Reset Code
                      </button>
                    </form>
                  </div>
                ) : (
                  <div>
                    <h2>Reset Password</h2>
                    <form onSubmit={handleResetPassword}>
                      <div className="form-group">
                        <label htmlFor="code">Code:</label>
                        <input 
                          type="text" 
                          id="code"
                          className="form-control"
                          value={code} 
                          onChange={(e) => setCode(e.target.value)} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="newPassword">New Password:</label>
                        <input 
                          type="password" 
                          id="newPassword"
                          className="form-control"
                          value={newPassword} 
                          onChange={(e) => setNewPassword(e.target.value)} 
                          required 
                        />
                      </div>
                      <button type="submit" className="btn btn-submit">
                        Reset Password
                      </button>
                    </form>
                  </div>
                )}
                {message && <p>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {countdown > 0 && <p>Redirecting to login in {countdown} seconds...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordReset;
