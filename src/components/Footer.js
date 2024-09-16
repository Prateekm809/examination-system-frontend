import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row className="align-items-center mb-4">
          <Col lg={6} className="text-center text-lg-left">
            <h1 className="text-primary">Online Examination System</h1>
          </Col>
          <Col lg={6} className="text-center text-lg-right">
            <Nav className="justify-content-center">
              <Nav.Link href="https://facebook.com" className="text-white me-3">
                <FaFacebook size={24} />
              </Nav.Link>
              <Nav.Link href="https://instagram.com" className="text-white me-3">
                <FaInstagram size={24} />
              </Nav.Link>
              <Nav.Link href="https://linkedin.com" className="text-white me-3">
                <FaLinkedin size={24} />
              </Nav.Link>
              <Nav.Link href="https://twitter.com" className="text-white me-3">
                <FaTwitter size={24} />
              </Nav.Link>
              <Nav.Link href="https://youtube.com" className="text-white">
                <FaYoutube size={24} />
              </Nav.Link>
            </Nav>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="text-primary">Get to Know Us</h5>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-white">About Us</Nav.Link>
              <Nav.Link href="#" className="text-white">Contact Us</Nav.Link>
              <Nav.Link href="#" className="text-white">Our Team</Nav.Link>
            </Nav>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="text-primary">Help</h5>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-white">FAQ</Nav.Link>
              <Nav.Link href="#" className="text-white">Support</Nav.Link>
              <Nav.Link href="#" className="text-white">Report an Issue</Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h5 className="text-primary">Policies</h5>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-white">Privacy Policy</Nav.Link>
              <Nav.Link href="#" className="text-white">Terms & Conditions</Nav.Link>
              <Nav.Link href="#" className="text-white">Exam Policy</Nav.Link>
            </Nav>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <p className="mb-0">© 2024 Online Examination System. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
