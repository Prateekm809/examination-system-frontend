import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, InputGroup, Alert } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../actions/authActions";
import Loader from "../components/Loader";
import * as authConstants from "../constants/authConstants";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [countdown, setCountdown] = useState(3);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);

  const showPasswordHandler = () => {
    const temp = !showPassword;
    setShowPassword(temp);
    setPasswordType(temp ? "text" : "password");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!identifier || !password) {
      setErrorMessage("Please fill in both identifier (username or email) and password.");
      return;
    }

    login(dispatch, identifier, password).then((data) => {
      if (data.type === authConstants.USER_LOGIN_SUCCESS) {
        setSuccessMessage("Logged in successfully! Redirecting in...");

        // Start countdown and redirect after 3 seconds
        const timer = setInterval(() => {
          setCountdown((prevCount) => prevCount - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(timer);
          const role = data.payload.roles.find((r) => r.roleName === "ADMIN");
          navigate(role ? "/adminProfile" : "/profile");
        }, 3000); // 3 seconds delay
      } else if (data.type === authConstants.USER_LOGIN_FAILURE) {
        setErrorMessage("Invalid username/email or password. Please try again.");
      }
    });
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (token && user) {
      const role = user.roles.find((r) => r.roleName === "ADMIN");
      navigate(role ? "/adminProfile" : "/profile");
    }
  }, [navigate]);

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
        `}
      </style>
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 h-[100vh]">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
              Welcome to our <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>Online Examination</span>
            </h1>
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <Form onSubmit={submitHandler}>
                  <Form.Group className="my-3" controlId="identifier">
                    <Form.Label>Username or Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Username or Email"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
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
                    disabled={!identifier || !password} // Disable if identifier or password is empty
                  >
                    Login
                  </Button>
                </Form>

                {loginReducer.loading && <Loader />}

                {errorMessage && (
                  <Alert variant="danger" className="my-3">
                    {errorMessage}
                  </Alert>
                )}

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
                  <Col>
                    Forgot Password?{" "}
                    <Link to="/forgotPass" style={{ color: "rgb(68 177 49)" }}>
                      Forgot Password
                    </Link>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
