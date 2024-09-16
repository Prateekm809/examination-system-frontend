import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, InputGroup, Alert } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../actions/authActions";
import Loader from "../components/Loader";
import * as authConstants from "../constants/authConstants";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [errorMessage, setErrorMessage] = useState(null); // New state for error handling
  const [successMessage, setSuccessMessage] = useState(null); // New state for success handling
  const [countdown, setCountdown] = useState(3); // New state for countdown
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);

  const showPasswordHandler = () => {
    const temp = !showPassword;
    setShowPassword(temp);
    if (temp) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrorMessage(null); // Clear previous error message
    setSuccessMessage(null); // Clear previous success message

    login(dispatch, username, password).then((data) => {
      if (data.type === authConstants.USER_LOGIN_SUCCESS) {
        setSuccessMessage("Logged in successfully! Redirecting in 3 seconds...");
        
        // Start countdown and redirect after 3 seconds
        const timer = setInterval(() => {
          setCountdown((prevCount) => prevCount - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(timer);
          data.payload.roles.map((r) => {
            if (r["roleName"] === "ADMIN") {
              return navigate("/adminProfile");
            } else {
              return navigate("/profile");
            }
          });
        }, 3000); // 3 seconds delay
      } else if (data.type === authConstants.USER_LOGIN_FAILURE) {
        // Set error message if login fails
        setErrorMessage("Invalid username or password. Please try again.");
      }
    });
  };

  useEffect(() => {
    if (token && user) {
      user.roles.map((r) => {
        if (r["roleName"] === "ADMIN") return navigate("/adminProfile");
        else return navigate("/profile");
      });
    }
  }, [token, user, navigate]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter User Name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={passwordType}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              onClick={showPasswordHandler}
              variant=""
              style={{ border: "1px solid black" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Button
          variant=""
          className="my-3"
          type="submit"
          style={{ backgroundColor: "rgb(68 177 49)", color: "white" }}
        >
          Login
        </Button>
      </Form>

      {/* Show loader if login is in progress */}
      {loginReducer.loading && <Loader />}

      {/* Show error message if login fails */}
      {errorMessage && (
        <Alert variant="danger" className="my-3">
          {errorMessage}
        </Alert>
      )}

      {/* Show success message when login succeeds */}
      {successMessage && (
        <Alert variant="success" className="my-3">
          {successMessage} {countdown > 0 && <span>{countdown}</span>}
        </Alert>
      )}

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to="/register" style={{ color: "rgb(68 177 49)" }}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
