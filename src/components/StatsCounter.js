import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const StatsCounter = ({ position = 'bottom' }) => {
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState({
    users: 0,
    exams: 0,
    questions: 0,
    courses: 0
  });

  const [finalCounts, setFinalCounts] = useState({
    users: 0,
    exams: 0,
    questions: 0,
    courses: 0
  });

  const imagePath = '/IMG/star.png'; // Update this path based on your public/static folder structure

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://examination-system-backend-production.up.railway.app/api/statistics/total');
        setFinalCounts(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, []);

  // Animate counts with random numbers
  useEffect(() => {
    if (visible) {
      const interval = setInterval(() => {
        setCounts(prevCounts => {
          const newCounts = { ...prevCounts };
          let allDone = true;

          for (const key in newCounts) {
            // Random counts to simulate loading
            if (newCounts[key] < finalCounts[key]) {
              newCounts[key] += Math.ceil(Math.random() * (finalCounts[key] - newCounts[key]) / 10);
              allDone = false;
            }
          }

          if (allDone) {
            // Once random counts reach or exceed final counts, set real data
            setCounts(finalCounts);
            clearInterval(interval);
          }
          return newCounts;
        });
      }, 100); // Adjust the interval time for smoother animation

      return () => clearInterval(interval);
    }
  }, [visible, finalCounts]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="position-relative d-flex justify-content-around align-items-center w-100 py-4 bg-white shadow-lg animate-slide-up">
      {/* Optional gradient effect */}
      <div className="position-absolute top-0 start-0 w-100" style={{ height: '4px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)' }}></div>
      
      {Object.entries(counts).map(([key, value]) => (
        <div key={key} className="text-center d-flex flex-column align-items-center">
          <div className="mb-2">
            <img
              src={imagePath}
              alt="Stats icon"
              width={90}
              height={90}
            />
          </div>
          <div className="fs-1 fw-bold text-primary">{value}</div>
          <div className="text-secondary">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
        </div>
      ))}

      {/* Optional gradient effect */}
      <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '4px', background: 'linear-gradient(to top, rgba(0,0,0,0.1), transparent)' }}></div>
    </div>
  );
};

export default StatsCounter;
