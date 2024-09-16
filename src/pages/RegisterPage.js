import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Form, Button, InputGroup, Row, Col, Alert } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as authConstants from "../constants/authConstants";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerReducer = useSelector((state) => state.registerReducer);

  const showPasswordHandler = () => {
    const temp = !showPassword;
    setShowPassword(temp);
    setPasswordType(temp ? "text" : "password");
  };

  const showConfirmPasswordHandler = () => {
    const temp = !showConfirmPassword;
    setShowConfirmPassword(temp);
    setConfirmPasswordType(temp ? "text" : "password");
  };

  const validateForm = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      username.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      password === confirmPassword
    );
  };

  const submitHandler = (e) => {
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
    };

    register(dispatch, user).then((data) => {
      if (data.type === authConstants.USER_REGISTER_SUCCESS) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setErrorMessage(""); // Clear error message
        let timer = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
        setTimeout(() => {
          clearInterval(timer);
          navigate("/login");
        }, 3000);
      } else {
        setErrorMessage("Registration failed. Please try again.");
        setSuccessMessage(""); // Clear success message
      }
    });
  };

  useEffect(() => {
    setValidated(validateForm());
  }, [firstName, lastName, username, password, confirmPassword, phoneNumber]);

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
