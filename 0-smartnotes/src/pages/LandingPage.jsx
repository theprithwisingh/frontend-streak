import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h3>Landing page</h3>
      <button>
        <Link to="/login">Login</Link>
      </button>
      <button>
        <Link to="/register">Register as User</Link>
      </button>
      <button>
        <Link to="/feedback">Feedback</Link>
      </button>
    </div>
  );
};

export default LandingPage;
