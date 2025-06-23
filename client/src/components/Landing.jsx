import React from 'react';
import './Landing.css';
import landingImg from '../assets/lan-img.png';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <>
      {/* Navbar with brand, login, and signup */}
      <nav className="navbar navbar-expand-lg custom-navbar sticky-top px-4">
  <div className="container-fluid">
    <a className="navbar-brand fw-bold fs-4 text-white" href="#">BookEase</a>

    <div className="d-flex ms-auto gap-2">
      <button className="btn btn-outline-light" onClick={() => navigate('/login')}>
        Login
      </button>
      <button className="btn btn-warning text-dark fw-semibold" onClick={() => navigate('/signup')}>
        Sign Up
      </button>
    </div>
  </div>
</nav>


      {/* Landing hero section */}
      <section className="landing-page d-flex align-items-center py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-white mb-4 mb-md-0">
              <h1 className="display-5 fw-bold">Simplify Your Bookings</h1>
              <p className="lead">Organize appointments effortlessly and stay on top of your schedule.</p>
              <button className="btn btn-warning text-dark fw-semibold px-4 py-2" onClick={handleSignup}>
  Book Now
</button>

            </div>
            <div className="col-md-6 text-center">
              <img src={landingImg} alt="Calendar" className="img-fluid rounded shadow" style={{ height: '370px', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Landing;
