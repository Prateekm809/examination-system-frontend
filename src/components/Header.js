import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { CiUser } from "react-icons/ci";

const Header = () => {
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);
  const [isLoggedIn, setIsLoggedIn] = useState(loginReducer.loggedIn);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate]);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/login");
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <img src="images/logo.svg" alt="Online Examination Logo" style={{ height: '45px' }} />
            {' '}
           
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {isLoggedIn ? (
                <div className="d-flex align-items-center position-relative">
                  <Nav.Link
                    onClick={handleDropdownClick}
                    className="d-flex align-items-center text-white"
                  >
                    {loginReducer.user.firstName} <CiUser size={20} />
                    <FaCaretDown size={16} />
                  </Nav.Link>
                  {isDropdownOpen && (
                    <div
                      className="dropdown-menu show"
                      style={{
                        color: 'black',
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        zIndex: 1000,
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        padding: '10px',
                        borderRadius: '4px',
                        minWidth: '120px',
                      }}
                    >
                      <LinkContainer to="/profile">
                        <Nav.Link className="text-dark">Profile</Nav.Link>
                      </LinkContainer>
                      <Nav.Link onClick={logoutHandler} className="text-dark">Logout</Nav.Link>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
