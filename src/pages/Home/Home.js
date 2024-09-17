import React from 'react';
import MyCarousel from '../../components/Carousel'; // Ensure the path is correct
import StatsCounter from '../../components/StatsCounter';
import TeamComponent from '../../components/Team';
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar and Footer can be uncommented if used */}
      {/* <Navbar /> */}
      <main className="flex-grow">
        <div className="position-relative">
          <MyCarousel />
          <div 
            className="carousel-caption d-flex flex-column align-items-center justify-content-center position-absolute top-50 start-50 translate-middle text-center" 
            style={{ zIndex: 10 }}
          >
            <h1 
              className="display-3 text-white mb-4 animate__animated animate__fadeIn " 
              style={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)', 
                fontWeight: 'bold' // Make text bolder
              }}
            >
              Welcome to Online Examination System
            </h1>
            <button 
              className="btn btn-primary btn-lg animate__animated animate__bounceInUp " // Add animation to button
            >
              <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
                Start Exam
              </Link>
            </button>
          </div>
        </div>
        <StatsCounter />
        <TeamComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
