import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, InputGroup, Alert } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import authServices from "../services/authServices"; // Adjust the import path as needed

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
    setPasswordType(showPassword ? "password" : "text");
  };

  const showConfirmPasswordHandler = () => {
    setShowConfirmPassword(!showConfirmPassword);
    setConfirmPasswordType(showConfirmPassword ? "password" : "text");
  };

  const validateForm = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      username.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      email.trim() !== "" &&
      password === confirmPassword
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setErrorMessage("Please fill all the fields correctly.");
      return;
    }

    const user = {
      firstName,
      lastName,
      username,
      password,
      phoneNumber,
      email,
    };

    try {
      setIsLoading(true);
      const response = await authServices.register(user);

      if (response.isRegistered) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setErrorMessage(""); // Clear error message
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setSuccessMessage(""); // Clear success message
        setErrorMessage(response.error || "Registration failed. Please try again."); // Display the error message from response
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Optional: Add validation logic here if needed
  }, [firstName, lastName, username, password, confirmPassword, phoneNumber, email]);
  return (
    <section className="background-radial-gradient overflow-hidden">
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
        `}
      </style>
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
              Welcome to our <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>Online Examination</span>
            </h1>
            <p className="mb-4 opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
              Discover our platform for streamlined and efficient online examinations. We provide a comprehensive solution for your testing needs, ensuring accuracy and ease of use. Get started today to experience seamless examination management.
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <Form onSubmit={submitHandler}>
                  {/* Form fields */}
                  <Form.Group className="my-3" controlId="fname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="my-3" controlId="lname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="my-3" controlId="username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter User Name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="my-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="my-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={passwordType}
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      ></Form.Control>
                      <Button
                        onClick={showPasswordHandler}
                        variant=""
                        style={{ border: "1px solid black" }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="my-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={confirmPasswordType}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      ></Form.Control>
                      <Button
                        onClick={showConfirmPasswordHandler}
                        variant=""
                        style={{ border: "1px solid black" }}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="my-3" controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="btn "
                    style={{ backgroundColor: "rgb(68 177 49)", color: "white" }}
                    disabled={!validateForm()}
                  >
                    Register
                  </Button>
                </Form>
                {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
                <div className="mt-3 text-center">
                  Already have an account? <Link to="/login" style={{ color: "rgb(68 177 49)" }}>Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;

