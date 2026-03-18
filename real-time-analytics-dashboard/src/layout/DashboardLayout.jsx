import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <h2>Welcome {user.name}</h2>
      <button onClick={() => navigate("/dashboard")}>Overview</button>

      <div>Current Path: {location.pathname}</div>

      <Outlet context={{ layoutTitle: "Dashboard Area" }} />
    </div>
  );
}
